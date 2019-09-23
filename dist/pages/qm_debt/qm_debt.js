// pages/qm_debt/qm_debt.js
var AjaxUrl = require('../../utils/util.js');
var newarr = []
var opends;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    names:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    opends = wx.getStorageSync('BL_openid')
    newarr = []
    that.setData({
      names: options.name,
      phos: options.pho,
      dues: options.dueMoneys,
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getCustomerOwnMoneyDetail.ashx',
      data: {
        openID: opends,
        CGUnitID: options.ids
      },
      success: function (res) {
        if (res.data.head.status == 'success') {
          setTimeout(function () {
            wx.hideLoading()
            if (res.data.body == '') {
              wx.showToast({
                title: '暂无数据！',
                icon: 'none',
              })
            } else {
              for (var i = 0; i < res.data.body.length; i++) {
                newarr.push(res.data.body[i])
              }
              that.setData({
                noens: false,
                getCustome: newarr,
              })
            }
          }, 100)
        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }
      }
    });
    that.fun_date(0)
  },
  fun_date: function (aa) {
    var that = this
    var date1 = new Date(),
      time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();//time1表示当前时间
      
    that.setData({
      times: time1
    })

  },
  // 销售明细
  sell: function (e) {
    wx.navigateTo({
      url: '../lm_history/lm_history?billnumbers=' + e.currentTarget.dataset.bum,
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