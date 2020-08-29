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

    this.totalWholesale = keepTwoDecimal(this.totalWholesale);
    this.totalPurchasePrice = keepTwoDecimal(this.totalPurchasePrice);
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

function keepTwoDecimal(num) {
  var result = parseFloat(num);
  if (isNaN(result)) {
      alert('传递参数错误，请检查！');
      return false;
  }
  result = Math.round(num * 100) / 100;
  return result;
};

module.exports = StatisticsModel;