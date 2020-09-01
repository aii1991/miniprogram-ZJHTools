const dbHelper = new DBHeplper();
const apiService = require("../server/api.server");
const tables = require("./tables");

function DBHeplper(){

}

DBHeplper.prototype.init = function(){
  apiService.getTableData().then(res=>{
    this.syscData(res);
  }).catch(err=>{
    console.log(err);
  });
}

DBHeplper.prototype.updateDB = function(){
  this.init();
}

/**
 * 同步数据
 * @param {} data 
 */
DBHeplper.prototype.syscData = function(data){
  var jData = JSON.parse(data);
  wx.setStorageSync(tables.goods, jData.t_goods);
  wx.setStorageSync(tables.bill, jData.t_bill);
  wx.setStorageSync(tables.statistics, jData.t_statistics);

  console.log("============数据来自后台============");
}



DBHeplper.prototype.insert = function(tName, data){
  var table = wx.getStorageSync(tName) || [];
  if(this._isContain(table, data.id) >= 0){
    return -2;
  }

  var nextId = 0;
  if(table.length > 0){
    nextId = table[table.length - 1].id + 1;
  }
  data.id = nextId;
  
  table.push(data);

  this._save(tName, table);

  return 1;
}


DBHeplper.prototype.updateById = function(tName,data){
  if(data.id < 0 || typeof data.id == "undefined"){
    return 0;
  }

  var res = 0;
  var table = wx.getStorageSync(tName) || [];

  var idx = this._isContain(table, data.id);
  if(idx >= 0){
    table[idx] = data;
    res = 1;
  }
  
  this._save(tName, table);

  return res;
}

DBHeplper.prototype.deleteById = function(tName, id = -1){
  if(id < 0){
    return;
  }
  var res = 0;
  var table = wx.getStorageSync(tName) || [];
  var delIdx = this._isContain(table, id);

  if(delIdx >= 0){
    table.splice(delIdx, 1);
    res = 1;
  }

  this._save(tName, table);
  
  return res;
}

DBHeplper.prototype.deleteByCondition = function(tName,cMap={key:'',value:''}){
  var table = this.findAll(tName);
  var delIdx = [];
  for(var i=0; i<table.length; i++){
    var record = table[i];
    if(record[cMap.key] == cMap.value){
      delIdx.push(i);
    }
  }
  delIdx.forEach(idx=>{
    table.splice(idx,1);
  });
  
  this._save(tName, table);

  return delIdx;
}


DBHeplper.prototype.findAll = function(tName){
  var table = wx.getStorageSync(tName) || [];
  return table;
}

DBHeplper.prototype.findById = function(tName, id){
  var table = this.findAll(tName);
  var idx = this._isContain(table, id);
  if(idx >= 0){
    return table[idx];
  }
  return null;
}

DBHeplper.prototype.findAllByCondition = function(tName,cMap={key:'',value:''}){
  var table = this.findAll(tName);
  var res = [];
  for(var i=0; i<table.length; i++){
    var record = table[i];
    if(record[cMap.key] == cMap.value){
      res.push(record);
    }
  }
  return res;
}

DBHeplper.prototype._save = function(tName, table){
  wx.setStorage({
    data: table,
    key: tName,
  });
}

DBHeplper.prototype._isContain = function(table, id){
  for(var i=0; i<table.length; i++){
    var record = table[i];
    if(record.id == id){
      return i;
    }
  }

  return -1;
} 

DBHeplper.prototype.backup = function(){
  var data = {};
  var tGoods = wx.getStorageSync('t_goods');
  var tBill = wx.getStorageSync('t_bill');
  var tStatistics = wx.getStorageSync('t_statistics');
  data["t_goods"] = tGoods;
  data["t_bill"] = tBill;
  data["t_statistics"] = tStatistics;
  apiService.postTableData(data).then(res=>{
    console.log(res);
  }).catch(err=>{
    console.log(err);
  });
}


module.exports = dbHelper;