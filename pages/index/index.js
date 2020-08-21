// pages/index/index.js
const app = getApp();

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

  },
  onClickShipment: function(){
    wx.navigateTo({
      url: '/pages/shipment/index/index',
    })
  },

  onClickScan: function(){
    
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