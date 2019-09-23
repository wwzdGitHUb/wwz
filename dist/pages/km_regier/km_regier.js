// pages/km_regier/km_regier.js
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
    // console.log(options)
    that.setData({
      countp: options.countp,
      countm: options.countm,
      productidname: options.productidname
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getStockByID.ashx',
      data: {
        openID: opends,
        productID: options.productid,
        storehouseID: options.storehouseid,
        parentID: options.parentid
      },
      success: function (res) {
        var arr = []
        if (res.data.head.status == 'success') {
          that.setData({
            arrs: res.data.body
          })
        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
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