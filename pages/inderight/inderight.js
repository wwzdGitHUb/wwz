
var AjaxUrl = require('../../utils/util.js');
var opends;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codes: ''
  },
  // 复制
  copyTBL: function (e) {
    var that = this;
    wx.setClipboardData({
      data: that.data.codes,
      success: function (res) {
        setTimeout(function () {
          wx.hideToast()
        }, 700)
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    opends = wx.getStorageSync('BL_openid')
    wx.removeStorageSync('BL_openid')
    var data = {

    }
    var postgetmethod = 'handleLogin.ashx'
    AjaxUrl.sendrequest(postgetmethod, data, function (res) {
      // console.log(res)
      var opends = wx.getStorageSync('BL_openid')
      if (opends != 111) {
        that.setData({
          codes: opends
        })
      }
    })

  },
  // 登录
  login: function () {
    var that = this
    wx.showLoading({
      title: '正在请求...',
    })
    var data = {

    }
    var postgetmethod = 'handleLogin.ashx'
    AjaxUrl.sendrequest(postgetmethod, data, function (res) {
      wx.hideLoading()
      console.log(res)
      if (res.data.head.status == 'success') {
        wx.switchTab({
          url: '../g_index/g_index',
        })
      } else {
        wx.showToast({
          title: res.data.head.msg,
          icon: 'none',
        })
      }
      if (opends != 111) {
        that.setData({
          codes: opends
        })
      }

    })

  },
  // 体验一下
  tiyan: function () {
    var that = this
    wx.showLoading({
      title: '请稍后...',
    })
    wx.setStorageSync("BL_openid", 111);
    setTimeout(function () {
      wx.hideLoading()
      wx.switchTab({
        url: '../g_index/g_index',
      })
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})