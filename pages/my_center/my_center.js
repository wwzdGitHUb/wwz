// pages/center/center.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gets: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var hei = app.globalData.hh
    var that = this
    var ges = wx.getStorageSync('head');
    console.log(ges)
    if (ges == '') {
      that.setData({
        gets: true,
        headerimg: '../images/head.png',
        names: '昵称'
      })
    } else {
      that.setData({
        gets: false,
        headerimg: ges.avatarUrl,
        names: ges.nickName
      })
    }

    this.setData({
      heights: hei
    })

  },
  getUserInfo: function (e) {
    var that = this
    // 登录
    wx.login({
      success: res => {
        wx.getUserInfo({
          success: function (res) {
            var person = JSON.parse(res.rawData);
            wx.setStorageSync('head', person)
            that.setData({
              gets: false,
              headerimg: person.avatarUrl,
              names: person.nickName
            })
          },
          fail: function (res) {
            console.log(res)
            that.setData({
              gets: true,
              headerimg: '../images/head.png',
              names: '会员'
            })
          }
        })
      }
    })

  },

  tuichu: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定退出？',
      success: function (res) {
        if (!res.cancel) {
          wx.removeStorageSync('BL_openid')
          wx.redirectTo({
            url: '../inderight/inderight',
          })
        }
      },
    })
   
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