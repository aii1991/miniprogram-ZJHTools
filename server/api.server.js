const BASE_URL = "https://www.sjwatch.cn:4443/rest/v1/";
const utils = require("../utils/util");


function wxPromise(method, url, data) {
  //返回一个Promise对象
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      dataType: 'json',
      success: function (res) {
        if (res.data.status == 1) {
          if(res.data.result){
            resolve(res.data.result);
          }else{
            resolve(res.data);
          }
        } else {
          reject(res.data.errorMsg);
        }
      },
      fail: function (res) {
        wx.showToast({
          title: '服务器连接失败',
          icon: 'none',
          duration: 2000
        })
        reject(res);
      }
    });
  });
}


function getRequest(url, data) {
  return wxPromise("GET", url, data);
}

function postRequest(url, data) {
  return wxPromise("POST", url, data);
}


function postTableData(tableData){
  var reqData = {};
  reqData.open_id = getOpenId();
  reqData.param = JSON.stringify(tableData);

  if(!reqData.open_id){
    return new Promise((resolve,reject)=>{
      reject("=====open_id not null=====");
    });
  }

  return postRequest(BASE_URL + "comm/ff",reqData);
}

function getTableData(){
  var openId = getOpenId();
  if(!openId){
    return new Promise((resolve,reject)=>{
      reject("====open_id not null====");
    })
  }
  return getRequest(BASE_URL + "comm/ff/" + openId);
}

function getOpenId(){
  var userInfo = wx.getStorageSync('user_info') || {};
  if(userInfo.nickName){
    return utils.hashCode(userInfo.country + userInfo.province + userInfo.city + userInfo.nickName + userInfo.gender);
  }
  return wx.getStorageSync("device_id");
}


module.exports={
  postTableData,
  getTableData
}