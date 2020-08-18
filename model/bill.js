const dbHepler = require("../db/db.helper");
const Statistics = require("./statistics");
const tables = require("../db/tables");
const T_BILL = tables.bill;
const T_GOODS = tables.goods;
const T_STATISTICS = tables.statistics;

const tBill = dbHepler.findAll(T_BILL);

function Bill(){
  this.id = -1;
  this.goodsList = []; //商品列表
  this.buyer = {
    name: "黑牛", //名称
    address: "" //地址
  }; //买方
  this.statistics = {};
  this.cTime = new Date().getTime();
}

Bill.prototype.generate = function(goodsList,buyer){
  this.goodsList = goodsList;
  if(buyer){
    this.buyer = buyer;
  }
  this.statistics = new Statistics().analyse(goodsList);

  var inertData = {
    id: -1,
    buyer: this.buyer,
    cTime: this.cTime
  }
  if(dbHepler.insert(T_BILL, inertData) == 1){
    this.statistics.billId = inertData.id;
    dbHepler.insert(T_STATISTICS, this.statistics);
    this.goodsList.forEach(goods=>{
      goods.billId = inertData.id;
      dbHepler.updateById(T_GOODS,goods);
    });
    tBill.push(this);
    return this;
  }
  return null;
}

Bill.prototype.delete = function(){
  if(dbHepler.deleteById(this.id) == 1){
    var idx = this._find();
    if(idx >= 0){
      tBill.splice(idx, 1);
      return this;
    }
  }
  return null;
}

Bill.prototype.list = function(){
  return tBill;
}

Bill.prototype._find = function(){
  for(var i=0; i<tBill.length; i++){
    var bill = tBill[i];
    if(bill.id == this.id){
      return i;
    }
  }
  return -1;
}




module.exports = Bill;