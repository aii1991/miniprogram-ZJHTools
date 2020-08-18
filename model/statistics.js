const dbHepler = require("../db/db.helper");
const tables = require("../db/tables");
const T_STATISTICS = tables.statistics;

function Statistics(){
  this.billId = -1;
  this.totalPurchasePrice = 0; //总进货价格
  this.totalWholesale = 0; //总出货价格
  this.totalNum = 0; //总出货量
  this.profit = 0; //利润
  this.cTime = new Date().getTime();
}


Statistics.prototype.analyse = function(goodsList){
  if(goodsList instanceof Array){
    goodsList.forEach(g=>{
      this.calc(g);
    });
    this.profit = this.totalWholesale - this.totalPurchasePrice;
    return this;
  }
  return null;
}

Statistics.prototype.calc = function(g){
  this.totalPurchasePrice += g.purchasePrice;
  this.totalWholesale += g.wholesale;
  this.totalNum += g.num;
}


module.exports = Statistics;