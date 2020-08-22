const data = require("../data/tobacco.data");
const PAGE_SIZE = 20;

function TobaccoModel(){
  
}

TobaccoModel.prototype.search = function(code){
  for(var i=0;i<data.length;i++){
    var d = data[i];
    if(code == d.CGT_CODE){
      return d;
    }
  }
  return null;
}

TobaccoModel.prototype.list = function(page){
  page = page - 1 < 0 ? 0 : page - 1;
  var offset = page * PAGE_SIZE;
  var limit = PAGE_SIZE;

  return new Promise(resolve=>{
    var res = data.slice(offset, offset+limit);
    resolve(res);
  });
}

/**
 * 启动相机扫码,存在返回
 */
TobaccoModel.prototype.openQrScanSearch = function(){
  return new Promise((resolve,reject)=>{
    wx.scanCode({
      scanType: ['barCode'],
      success: (res)=>{
        console.log(res);
        var code = res.result; //条码
        var tobacco = this.search(code);
        if(tobacco){
          resolve(tobacco);
        }else{
          reject("查询不到该物品");
        }
      },
      fail: (res)=>{
        console.log(res);
        reject("系统错误");
      }
    })
  })
}


module.exports = TobaccoModel;