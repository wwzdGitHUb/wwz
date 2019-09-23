// pages/hm_liveness/hm_liveness.js
var AjaxUrl = require('../../utils/util.js');
var opends;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    opends = wx.getStorageSync('BL_openid')
    that.setData({
      address: options.address,
      avgmoney: options.avgmoney,
      cgunitname: options.cgunitname,
      countnum: options.countnum,
      lastdate: options.lastdate,
      mobilephone: options.mobilephone,
      noselldays: options.noselldays,
      summoney: options.summoney,
      data1: options.data1,
      data2: options.data2
    })
    that.lists(options)
  },
  lists: function (options) {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getCustomerProductStatic.ashx',
      data: {
        openID: opends,
        CGUnitID: options.id,
        startDate: options.data1,
        endDate: options.data2
      },
      success: function (res) {
        console.log(res)
        if (res.data.head.status == 'success') {
         
          that.setData({
            pronlist:res.data.body
          })
        }else{
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }
        
      }
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