//index.js
//获取应用实例
const app = getApp();
const BillModel = require("../../../model/bill");
const utils = require("../../../utils/util");

Page({
  data: {
    titles:[
      "买方名字","总进货价","总出货价","总出货量","利润","创建时间"
    ],
    billList: [],
    isIpad: utils.isIpad(app)
  },
  onLoad: function () {
    this.billModel = new BillModel();
  },
  onShow: function(){
    this.update(); 
  },
  update: function(){
    this.setData({
      billList: this.billModel.list()
    })
  },
  onClickRow: function(e){
    console.log(e)
    var billId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/shipment/goods/list/list?billId=' + billId,
    })
  },
   /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.getShareAppMessage();
  },
})
