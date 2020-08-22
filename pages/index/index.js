// pages/index/index.js
const app = getApp();
const TobaccoModel = require("../../model/tobacco")

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tobaccoModel = new TobaccoModel();
  },
  onClickShipment: function(){
    wx.navigateTo({
      url: '/pages/shipment/index/index',
    })
  },

  onClickScan: function(){
    this.tobaccoModel.openQrScanSearch().then(res=>{
      wx.navigateTo({
        url: '/pages/goods/detail/detail?goods=' + JSON.stringify(res),
      })
    }).catch(err=>{
      wx.showToast({
        icon: none,
        title: err,
      })
    })
  },

  onClickGoodsList: function(){
    wx.navigateTo({
      url: '/pages/goods/list/list',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})