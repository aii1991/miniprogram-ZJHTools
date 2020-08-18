//index.js
//获取应用实例
const app = getApp();
const Bill = require("../../model/bill");

Page({
  data: {
    titles:[
      "买方名字","总进货价","总出货价","总出货量","利润","创建时间"
    ],
    billList: []
  },
  onLoad: function () {
    this.bill = new Bill();
    this.update();
  },
  onShow: function(){
    this.update(); 
  },
  update: function(){
    this.setData({
      billList: this.bill.list()
    })
  },
   /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.getShareAppMessage();
  },
})
