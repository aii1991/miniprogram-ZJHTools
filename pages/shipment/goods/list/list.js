// pages/goods/list/list.js
const app = getApp()
const GoodsModel = require("../../../../model/goods");
const BillModel = require("../../../../model/bill");
const StatisticsModel = require("../../../../model/statistics");
const utils = require("../../../../utils/util");

Page({
  data: {
    titles:[
      "商品编码","商品名称","进货价","出货价","数量","利润小计"
    ],
    goodsList: [],
    statistics: {},
    isFromBill: false,
    slideBtns: [{
      text: '删除',
      type: 'warn'
    }],
    isIpad: utils.isIpad(app)
  },
  onLoad: function (param) {
    console.log("onLoad")
    this.billId = -1;
    if(param.billId){
      this.billId = param.billId;
    }
    this.setData({
      isFromBill: this.billId >= 0
    })
    this.goodsModel = new GoodsModel();
    this.billModel = new BillModel();
    this.statisticsModel = new StatisticsModel();
  },
  onShow: function(){
    console.log("onshow")
    this.update();
  },
  update: function(){
    var goodsList = this.goodsModel.list(this.billId);
    var statistics = this.statisticsModel.analyse(goodsList);

    this.setData({
      goodsList: goodsList,
      statistics: statistics
    });
  },
  onClickGenerateBill: function(){
    wx.showModal({
      title: "确定生成对账单?",
      content: "",
      success:(res)=>{
        if(res.confirm){
          var b = this.billModel.generate(this.data.goodsList);
          if(b){
            wx.showToast({
              title: '对账单生成成功',
            });
            wx.navigateBack({
              delta: 1,
            });
          }else{
            wx.showToast({
              title: '对账单生成失败，请联系管理员',
            });
          }
        }
      }
    });
  },
  onClickReset: function(e){
    this.goods.clear(this.billId);
    this.setData({
      goodsList: [],
      statistics: {}
    });
  },
  onClickGoods: function(e){
    var idx = e.currentTarget.dataset.idx;
    var goods = this.data.goodsList[idx];
    wx.navigateTo({
      url: '/pages/shipment/goods/add/add?goods='+JSON.stringify(goods),
    });
  },
  onClickRmBtn: function(e){
    var idx = e.currentTarget.dataset.idx;
    var goods = this.data.goodsList[idx];
    var res = this.goodsModel.delete(goods.id);
    if(res){
      this.update();
    }
  },
   /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.getShareAppMessage();
  },
})
