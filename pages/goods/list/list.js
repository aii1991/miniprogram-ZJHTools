// pages/goods/list/list.js
const app = getApp();
const TobaccoModel = require("../../../model/tobacco");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.page = 1;
    this.tobaccoModel = new TobaccoModel();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
  },
  getData: function(isRefresh=false,isLoadMore=false){
    if(!isLoadMore){
      if(!isRefresh){
        wx.showLoading({
          title: '加载数据中',
        });
      }
      this.page = 1;
      this.tobaccoModel.list(this.page).then(res=>{
        wx.hideLoading();
        this.setData({
          dataList:res
        });
      });
      return;
    }

    this.page ++;
    this.tobaccoModel.list(this.page).then(res=>{
      this.dataList.push(...res);
      this.setData({
        dataList: this.data.dataList
      });
    });

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getData(false,false);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.getShareAppMessage();
  }
})