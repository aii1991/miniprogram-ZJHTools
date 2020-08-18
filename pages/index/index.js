//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    titles:[
      "商品编码","商品名称","进货价","出货价","数量","创建时间"
    ],
    goodsList: []
  },
  onLoad: function () {
    
  },

   /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.getShareAppMessage();
  },
})
