const dbHelper = new DBHeplper();

function DBHeplper(){

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

  wx.setStorage({
    data: table,
    key: tName
  });

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
  
  wx.setStorage({
    data: table,
    key: tName,
  });

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
  wx.setStorage({
    data: table,
    key: tName,
  });
  return res;
}


DBHeplper.prototype.findAll = function(tName){
  var table = wx.getStorageSync(tName) || [];
  return table;
}

DBHeplper.prototype.findById = function(id){
  var table = wx.getStorageSync(tName) || [];
  var idx = this._isContain(table, id);
  if(idx >= 0){
    return table[idx];
  }
  return null;
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


module.exports = dbHelper;