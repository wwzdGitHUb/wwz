//定义接口地址
var AjaxUrl = "https://www.clbaba.com/AndroidService/jydz/xcxboss/";
var cgunitid = ''
var openID = ''
var sendrequest = function (postgetmethod, data, success) {
  wx.checkSession({
    success: function (res) {
      //session 未过期，并且在本生命周期一直有效
      openID = wx.getStorageSync('BL_openid')
      // console.log(openID)
      // console.log(openID)
      if (typeof openID == undefined || null == openID || "" == openID) {
        console.log("授权有效,没有缓存分支");
        //登录态过期
        sedopenids(postgetmethod, data, success)
      } else {
        console.log("登录有效 缓存存在分支");
        //openids获取成功后
        wx.setStorageSync("BL_openid", openID);
        data.openID = openID
        AjaRequest(postgetmethod, data, success)
      }
    },
    fail: function () {
      // console.log("登录失效 重新登录分支");
      //登录态过期
      sedopenids(postgetmethod, data, success);
    }
  })
}



// 获取信息
// function information(data) {
//   wx.request({
//     url: AjaxUrl + 'getCustomerInfo.ashx',
//     data: {
//       openID : data.openID
//     },
//     success: function (res) {
//       wx.setStorageSync('cgunitid', res.data.body[0])
//     }
//   });
// }

function sedopenids(postgetmethod, data, success) {
  wx.login({
    //获取code
    success: function (res) {
      // console.log(res)
      var codes = res.code; //返回code
      if (res.code) {
        //发起网络请求
        wx.request({
          url: AjaxUrl + 'getOpenID.ashx',
          data: {
            code: codes
          },
          success: function (res) {
            if (res.data.IsSuccess == true) {
              // 缓存openid
              var openID = JSON.parse(res.data.Result).openid
              if (typeof openID == undefined || null == openID || "" == openID) {
                console.log('获取opend失败')
              } else {
                wx.setStorageSync('BL_openid', openID);
                data.openID = openID;
                // information(data)
                AjaRequest(postgetmethod, data, success)
              }
            } else {
              console.log('openid获取失败')
            }
          }
        });
      } else {
        console.log('登录失败！' + res.data.errMsg)
      }
    }
  })
}
// 请求方法
function AjaRequest(postgetmethod, data, success) {
  if (typeof openID != undefined || null != openID || "" != openID) {
    // information(data)
    wx.request({
      url: AjaxUrl + postgetmethod,
      data: data,
      success: function (res) {
        if (typeof success == "function") {
          success(res)
        }
      }
    });
  }
}

module.exports = {
  AjaxUrl: AjaxUrl,
  sendrequest: sendrequest,
}



