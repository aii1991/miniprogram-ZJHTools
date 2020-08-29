//app.js
const {updateData} = require("./data/tobacco.data");
App({
  onLaunch: function () {
    this.globalData.systemInfo = wx.getSystemInfoSync();
    // updateData();
  },
  globalData: {
    userInfo: null,
    systemInfo:{}
  },
  getShareAppMessage: function (success, fail) {
    wx.showShareMenu({
      withShareTicket: true
    });
    return {
      path: '/pages/index/index',
      success: (res) => {
        if (success) success(res)
      },
      fail: (err) => {
        if (fail) fail(err)
      }
    }
  }
})