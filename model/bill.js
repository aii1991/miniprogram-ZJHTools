const dbHepler = require("../db/db.helper");
const StatisticsModel = require("./statistics");
const tables = require("../db/tables");
const T_BILL = tables.bill;
const T_GOODS = tables.goods;
const T_STATISTICS = tables.statistics;

const tBill = findAllBill();

function findAllBill(){
  var tBill = dbHepler.findAll(T_BILL);
  tBill.forEach(tb=>{
    var tGoods = dbHepler.findAllByCondition(T_GOODS, {key:"billId", value: tb.id});
    tb.goodsList = tGoods;
    var tStatistics = dbHepler.findAllByCondition(T_STATISTICS, {key:"billId", value: tb.id});
    tb.statistics = tStatistics[0]
  });
  return tBill;
}

function BillEntity(){
  this.id = -1;
  this.goodsList = []; //商品列表
  this.buyer = {
    name: "", //名称
    address: "" //地址
  }; //买方
  this.statistics = {};
  this.cTime = new Date().getTime();
}

//------------------------------------------

function BillModel(){};

BillModel.prototype.generate = function(goodsList,buyer={name:"黑牛",address:""}){
  var billEntity = new BillEntity();
  billEntity.goodsList = goodsList;
  billEntity.buyer = buyer;
  var statistics = new StatisticsModel().analyse(goodsList);
  billEntity.statistics = statistics;

  var inertData = {
    id: -1,
    buyer: billEntity.buyer,
    cTime: billEntity.cTime
  }
  if(dbHepler.insert(T_BILL, inertData) == 1){
    billEntity.id = inertData.id;
    billEntity.statistics.billId = inertData.id;
    dbHepler.insert(T_STATISTICS, billEntity.statistics);
    billEntity.goodsList.forEach(goods=>{
      goods.billId = inertData.id;
      dbHepler.updateById(T_GOODS,goods);
    });
    tBill.push(billEntity);
    return billEntity;
  }
  return null;
}

BillModel.prototype.delete = function(id){
  if(dbHepler.deleteById(id) == 1){
    var idx = this._find(id);
    if(idx >= 0){
      tBill.splice(idx, 1);
      return 1;
    }
  }
  return 0;
}

BillModel.prototype.list = function(){
  return tBill;
}

BillModel.prototype._find = function(id){
  for(var i=0; i<tBill.length; i++){
    var bill = tBill[i];
    if(bill.id == id){
      return i;
    }
  }
  return -1;
}

module.exports = BillModel;