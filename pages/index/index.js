// pages/index/index.js
const app = getApp();
const TobaccoModel = require("../../model/tobacco");
const wxWrap = require("../../utils/wx.wrap");
const dbHelper = require("../../db/db.helper");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuth: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tobaccoModel = new TobaccoModel();

    wxWrap.getUserInfo().then(res=>{
      console.log(res);
      this.updateUserInfo(res.userInfo);
      this.setData({
        isAuth: true
      })
    }).catch(err=>{});
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

  },
  onGetUserInfo: function(e){
    console.log(e);
    this.updateUserInfo(e.detail.userInfo);
    dbHelper.updateDB();
  },
  updateUserInfo: function(userInfo){
    app.globalData.userInfo = userInfo;
    wx.setStorageSync('user_info', app.globalData.userInfo);
  }
})