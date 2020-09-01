const app = getApp();
const dpr = app.globalData.systemInfo.pixelRatio;

function login() {
  return new Promise(function (resolve, reject) {
    wx.login({
      success: function (res) {
        if (res.code) resolve(res);
        else reject();
      },
      fail: function (res) {
        reject(res);
      }
    })
  });
}

function checkSession() {
  return new Promise(function (resolve, reject) {
    wx.checkSession({
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    })
  });
}

function getSetting() {
  return new Promise(function (resolve, reject) {
    wx.getSetting({
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    })
  });
}

function getUserInfo() {
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    })
  });
}

function getSystemInfo() {
  return new Promise(function (resolve, reject) {
    wx.getSystemInfo({
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        reject(res);
      }
    })
  });
}

function saveImageToAlbum(imgUrl){
  return new Promise(function(resolve,reject){
    authorize('scope.writePhotosAlbum').then(res=>{
      wx.saveImageToPhotosAlbum({
        filePath: imgUrl,
        success: function (data) {
          wx.showToast({
            title: '图片保存成功',
            icon: 'success',
            duration: 2000
          });
          resolve(res);
        },
        fail: function (err) {
          console.log(err);
          wx.showToast({
            title: '图片保存失败',
            icon: 'none',
            duration: 2000
          });
          reject(err);
        }
      });
    }).catch(err=>{
      reject(err);
    });
  })
}


function authorize(scope) {
  return new Promise(function (resolve, reject) {
    getSetting().then(res => {
      if (!res.authSetting[scope]) {
        wx.authorize({
          scope: scope,
          success: function (res) {
            resolve(res);
          },
          fail: function (err) {
            reject(err);
          }
        });
      }else{
        resolve(res);
      }
    }).catch(err => {
      reject(err);
    })
  });
}


function wxPay(orderInfo){
  return new Promise(function(resolve,reject){
    wx.requestPayment({
      appId: orderInfo.pay_callback.appId,
      timeStamp: "" + orderInfo.pay_callback.timeStamp,
      nonceStr: orderInfo.pay_callback.nonceStr,
      package: orderInfo.pay_callback.package,
      signType: orderInfo.pay_callback.signType,
      paySign: orderInfo.pay_callback.paySign,
      success:function(res){
        res.order = orderInfo.order;
        resolve(res);
      },
      fail:function(err){
        reject(err);
      }
    })
  })
}


function wxSetClipboardData(data){
  return new Promise(function (resolve, reject){
    wx.setClipboardData({
      data: data,
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

function wxGetClipboardData() {
  return new Promise(function (resolve, reject) {
    wx.getClipboardData({
      success: function (res) {
        resolve(res);
      },
      fail: function (err) {
        reject(err);
      }
    });
  });
}

function wxQueryElementInfo(selector){
  return new Promise(function(resolve,reject){
    var query = wx.createSelectorQuery();
    query.select(selector).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      resolve(res);
    });
  });
}

function wxQueryAllElementInfo(selector){
  return new Promise(function (resolve, reject) {
    var query = wx.createSelectorQuery();
    query.selectAll(selector).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      res.map(r=>{
        resolve(r);
      })
    });
  });
}

function wxDownloadFile(url){
  var cacheFileList = wx.getStorageSync("cacheFileList");
  if (!cacheFileList) {
    cacheFileList = {};
  }

  return new Promise((resolve, reject) => {
    var cacheFilePath = cacheFileList[hashCode(url)];
    if (cacheFilePath) {
      try {
        wx.getFileSystemManager().accessSync(cacheFilePath);
        resolve(cacheFilePath);
        return;
      } catch (e) { }
    }
    wx.downloadFile({
      url: url,
      success(res) {
        if (res.statusCode === 200) {
          var tempFilePath = res.tempFilePath;
          saveFile(tempFilePath).then(res=>{
            var savePath = res.savedFilePath;
            cacheFileList[hashCode(url)] = savePath;
            wx.setStorageSync("cacheFileList", cacheFileList);
            resolve(savePath);
          }).catch(err=>{
            reject(tempFilePath);
          })
        }
      },
      fail(err) {
        reject(err);
      }
    })
  });
}

function hashCode(str) {
  var hash = 0, i, chr, len;
  if (str.length === 0) return hash;
  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}



function createCanvas2d(elementId,componentCtx){
  return new Promise((resolve,reject) => {
    var query = null;
    if(componentCtx){
      query = componentCtx.createSelectorQuery();
    }else{
      query = wx.createSelectorQuery();
    }
    query.select(elementId).fields({
      node: true,
      size: true
    }).exec(function(res){
      const canvas = res[0].node;
      var ctx = canvas.getContext('2d');
      canvas.width = res[0].width * dpr;
      canvas.height = res[0].height * dpr;
      ctx.scale(dpr, dpr);
      resolve({canvas, ctx});
    });
  });
}


function saveFile(tempFilePath){
  return new Promise((resolve,reject)=>{
    canSaveFile().then(()=>{
      wx.saveFile({
        tempFilePath: tempFilePath,
        success(res){
          resolve(res)
        },
        fail(err){
          console.log(err);
          reject(err);
        }
      })
    }).catch(err=>{
      reject(err);
    })
  })

}


/**
 * 判断本地存储空间是否有足够空间保存文件
 */
function canSaveFile(){
  return new Promise((resolve,reject)=>{
    wx.getSavedFileList({
      success (res) {
        var fileList = res.fileList;
        var totalSize = 0;
        if(fileList){
          fileList.forEach(f=>{
            totalSize+=f.size;
          });
        }
        console.log("本地存储已使用=>" + (totalSize/1024/1024).toFixed(2) + "M");
        console.log(fileList);
        var r = totalSize < 1024 * 1024 * 10; //本地最大存储空间为10M
        if(r){
          resolve(r)
        }else{
          wx.showToast({
            title: '文件保存失败,本地存储空间已满',
            icon: "none"
          })
          reject(r);
        }
      },
      fail(err){
        reject(err)
      }
    })
  });

}



module.exports = {
  login: login,
  checkSession: checkSession,
  getSetting: getSetting,
  getUserInfo: getUserInfo,
  getSystemInfo: getSystemInfo,
  saveImageToAlbum: saveImageToAlbum,
  wxPay: wxPay,
  wxSetClipboardData: wxSetClipboardData,
  wxGetClipboardData: wxGetClipboardData,
  wxQueryElementInfo: wxQueryElementInfo,
  wxQueryAllElementInfo: wxQueryAllElementInfo,
  wxDownloadFile: wxDownloadFile,
  createCanvas2d: createCanvas2d,
  saveFile: saveFile
}