const dbHepler = require("../db/db.helper");
const T_GOODS = "t_goods";
const tGoods = dbHepler.findAll(T_GOODS);

function Goods(){
  this.id = -1;
  this.code = ""; //商品编码
  this.name = ""; //商品名称
  this.purchasePrice = 0; //进货价
  this.wholesale = 0; //批发价(卖给批发部)
  this.num = 0; //数量
  this.cTime = new Date().getTime();
  this.uTime = new Date().getTime();
}


Goods.prototype.initData = function(goods){
  this.code = goods.code;
  this.name = goods.name;
  this.purchasePrice = parseInt(goods.purchasePrice);
  this.wholesale = parseInt(goods.purchasePrice);
  this.num = parseInt(goods.num);
}


Goods.prototype.save = function(){
  var g = this._isContain();
  if(g){
    g.num += this.num;
    dbHepler.updateById(T_GOODS, g);
  }else{
    if(dbHepler.insert(T_GOODS,this) == 1){
      tGoods.push(this);
    }
  }
}


Goods.prototype._isContain = function(){
  for(var i=0; i<tGoods.length; i++){
    var goods = tGoods[i];
    if(goods.code == this.code){
      return goods;
    }
  }
  return null;
}

module.exports = Goods;


