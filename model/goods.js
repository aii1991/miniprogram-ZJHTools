const dbHepler = require("../db/db.helper");
const tables = require("../db/tables");
const T_GOODS = tables.goods;

function GoodsEntity(goods,billId = -1){
  this.billId = billId;
  this.id = goods.id >= 0 ? goods.id : -1;;
  this.code = goods.code || ""; //商品编码
  this.name = goods.name || ""; //商品名称
  this.purchasePrice = parseInt(goods.purchasePrice); //进货价
  this.wholesale = parseInt(goods.wholesale); //批发价(卖给批发部)
  this.num = parseInt(goods.num); //数量
  this.cTime = new Date().getTime();
  this.uTime = new Date().getTime();
}


//--------------------------------------------------

function GoodsModel(){}

GoodsModel.prototype.save = function(goods){
  var goodsEntity = new GoodsEntity(goods);
  var g = this._isContain(goodsEntity.code);
  if(g){
    g.num += parseInt(goods.num);
    return dbHepler.updateById(T_GOODS, g);
  }else{
    if(dbHepler.insert(T_GOODS,goodsEntity) == 1){
      return goodsEntity;
    }else{
      return null;
    }
  }
}

GoodsModel.prototype.update = function(goods){
  var goodsEntity = new GoodsEntity(goods);
  if(dbHepler.updateById(T_GOODS, goodsEntity) == 1){
    return this;
  }
  return null;
}

GoodsModel.prototype.delete = function(id){
  if(dbHepler.deleteById(T_GOODS,id) == 1){
    return 1;
  }
  return 0;
}

GoodsModel.prototype.list = function(billId = -1){
  return dbHepler.findAllByCondition(T_GOODS, {key:"billId", value: billId});
}

GoodsModel.prototype.clear = function(billId = -1){
  var tGoods = this.list();
  tGoods.forEach(g=>{
    dbHepler.deleteByCondition(T_GOODS,{key:"billId", value: billId});
  });
}

GoodsModel.prototype._find = function(findGoodsId = -1){
  var tGoods = this.list();
  for(var i=0; i<tGoods.length; i++){
    var goods = tGoods[i];
    if(goods.id == findGoodsId){
      return i;
    }
  }
  return -1;
}

GoodsModel.prototype._isContain = function(code = -1){
  var tGoods = this.list();
  for(var i=0; i<tGoods.length; i++){
    var goods = tGoods[i];
    if(goods.code == code){
      return goods;
    }
  }
  return null;
}

module.exports = GoodsModel;


