const dbHepler = require("../db/db.helper");
const tables = require("../db/tables");
const T_GOODS = tables.goods;
var tGoods = dbHepler.findAllByCondition(T_GOODS, {key:"billId", value: -1});

function Goods(){
  this.billId = -1;
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
    return dbHepler.updateById(T_GOODS, g);
  }else{
    if(dbHepler.insert(T_GOODS,this) == 1){
      tGoods.push(this);
      return this;
    }
  }
  tGoods = [];
}

Goods.prototype.update = function(){
  if(dbHepler.updateById(this) == 1){
    var idx = this._find();
    if(idx >= 0){
      tGoods[idx] = this;
      return this;
    }
  }
  return null;
}

Goods.prototype.delete = function(){
  if(dbHepler.deleteById(this.id) == 1){
    var idx = this._find();
    if(idx >= 0){
      tGoods.splice(idx, 1);
      return this;
    }
  }
  return null;
}

Goods.prototype.list = function(){
  return tGoods;
}

Goods.prototype._find = function(){
  for(var i=0; i<tGoods.length; i++){
    var goods = tGoods[i];
    if(goods.id == this.id){
      return i;
    }
  }
  return -1;
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


