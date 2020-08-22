// pages/goods/detail/detail.js
const app = getApp();
const TobaccoModel = require("../../../model/tobacco");
const baseImgUrl = "http://gd.xinshangmeng.com:9090/xsm6/resource/ec/cgtpic/";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{},
    goodsImgs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tobaccoModel = new TobaccoModel();
    var goods = null;
    if(options.goods){
      goods = JSON.parse(options.goods);
    }else{
      var code = options.code;
      goods = this.tobaccoModel.search(code);
    }
    
    this.setData({
      goods: goods,
      goodsImgs: [
        baseImgUrl + goods.CGT_CODE + "_middle_face.png",
        baseImgUrl + goods.CGT_CODE + "_middle_rear.png",
        baseImgUrl + goods.CGT_CODE + "_middle_left.png",
        baseImgUrl + goods.CGT_CODE + "_middle_right.png",
        baseImgUrl + goods.CGT_CODE + "_middle_body.png",
        baseImgUrl + goods.CGT_CODE + "_middle_cig.png",
      ]
    });
  },
  onClickImgItem: function(e){
    var idx = e.currentTarget.dataset.idx;
    wx.previewImage({
      urls: this.data.goodsImgs,
      current: this.data.goodsImgs[idx]
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.getShareAppMessage();
  }
})