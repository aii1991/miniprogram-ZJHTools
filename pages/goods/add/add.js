// pages/add/add.js
const app = getApp();
const Goods = require("../../../model/goods")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      
    },
    rules: [ 
      {
          name: 'code',
          rules: {required: true, message: '商品编码必填'},
      }, 
      {
          name: 'name',
          rules: {required: true, message: '商品名称'},
      }, 
      {
          name: 'purchasePrice',
          rules: {required: true, message: '进货价必填'},
      }, 
      {
          name: 'wholesale',
          rules: {required: true, message: '出货价必填'},
      },
      {
        name: 'num',
        rules: {required: true, message: '出货数量必填'},
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return app.getShareAppMessage();
  },

  formInputChange(e) {
    const {field} = e.currentTarget.dataset;
    this.setData({
        [`formData.${field}`]: e.detail.value
    })
  },
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
            this.setData({
                error: errors[firstError[0]].message
            })

        }
      } else {
        // wx.showToast({
        //     title: '校验通过'
        // })
        this.execSubmit();
      }
    })
  },
  execSubmit: function(){
    var goods = new Goods();
    goods.initData(this.data.formData);
    var res = goods.save();
    if(res){
      wx.showToast({
        title: '提交成功',
      });
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        }); 
      }, 2000);
    }
  }

})