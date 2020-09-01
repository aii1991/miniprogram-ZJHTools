//app.js
const {updateData} = require("./data/tobacco.data");
const dbHepler = require("./db/db.helper");
const utils = require("./utils/util");

App({
  onLaunch: function () {
    this.globalData.systemInfo = wx.getSystemInfoSync();
    // updateData();


    this.generateDeviceId();

    dbHepler.init();
  },

  globalData: {
    userInfo: wx.getStorageSync('user_info') || {},
    systemInfo:{},
    deviceId: 0
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
  },
  generateDeviceId: function(){
    var key = "device_id";
    var deviceId = wx.getStorageSync(key) || 0;
    if(!deviceId){
      deviceId = utils.generateUUID();
      wx.setStorageSync(key, deviceId);
    }
    this.globalData.deviceId = deviceId;
  }
})