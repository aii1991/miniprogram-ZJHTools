// pages/add/add.js
const app = getApp();
const GoodsModel = require("../../../model/goods")

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
    ],
  },

  onLoad: function(param){
    this.isUpdate = false;
    if(param.goods){
      this.setData({
        formData: JSON.parse(param.goods)
      });
      this.isUpdate = true;
    }
  },

  onClickScan: function(){
    wx.scanCode({
      scanType: ['barCode'],
      success: (res)=>{
        console.log(res);
        var code = res.result; //条码
      },
      fail: (res)=>{
        console.log(res);
      }
    })
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
        //校验通过
        this.execSubmit();
      }
    })
  },
  execSubmit: function(){
    var goodsModel = new GoodsModel();
    var res = null;
    if(!this.isUpdate){
      res = goodsModel.save(this.data.formData);
    }else{
      res = goodsModel.update(this.data.formData);
    }
    if(res){
      wx.showToast({
        title: '操作成功',
      });
      setTimeout(() => {
        wx.navigateBack({
          delta: 1,
        }); 
      }, 2000);
    }else{
      wx.showToast({
        title: '操作失败',
      });
    }
  }

})