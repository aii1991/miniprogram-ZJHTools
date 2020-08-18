//app.js
App({
  onLaunch: function () {
    
  },
  globalData: {
    userInfo: null
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