// pages/goods/list/list.js
const app = getApp()
const Goods = require("../../../model/goods");
const Bill = require("../../../model/bill");

Page({
  data: {
    titles:[
      "商品编码","商品名称","进货价","出货价","数量","创建时间"
    ],
    goodsList: []
  },
  onLoad: function () {
    this.goods = new Goods();
    this.bill = new Bill();
    this.update();
  },
  onShow: function(){
    this.update();
  },
  update: function(){
    this.setData({
      goodsList: this.goods.list()
    });
  },
  onClickGenerateBill: function(){
    wx.showModal({
      title: "确定生成对账单?",
      success:(res)=>{
        if(res.confirm){
          var b = this.bill.generate(this.data.goodsList);
          
        }
      }
    })
  },
   /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.getShareAppMessage();
  },
})
