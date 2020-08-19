const dbHepler = require("../db/db.helper");
const tables = require("../db/tables");
const T_STATISTICS = tables.statistics;

function StatisticsModel(){
  this._init();
}

StatisticsModel.prototype._init = function(){
  this.billId = -1;
  this.totalPurchasePrice = 0; //总进货价格
  this.totalWholesale = 0; //总出货价格
  this.totalNum = 0; //总出货量
  this.profit = 0; //利润
  this.cTime = new Date().getTime();
}

StatisticsModel.prototype.analyse = function(goodsList){
  if(goodsList instanceof Array){
    this._init();
    goodsList.forEach(g=>{
      this.calc(g);
    });
    this.profit = this.totalWholesale - this.totalPurchasePrice;
    return this;
  }
  return null;
}

StatisticsModel.prototype.calc = function(g){
  this.totalPurchasePrice += g.purchasePrice * g.num;
  this.totalWholesale += g.wholesale * g.num;
  this.totalNum += g.num;
}


module.exports = StatisticsModel;