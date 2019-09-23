// pages/codes/codes.js
var AjaxUrl = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    web:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var op = options.opendsset
    var bill = options.bill
    that.setData({
      bill: bill,
      op: op
    })
    that.ajaxlist(op,bill)
    that.couterlist(op, bill)

  },
  ajaxlist: function (op,billnumbers) {
    var that = this;
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getSellMainDataByBillNumber.ashx',
      data: {
        openID: op,
        billNumber: billnumbers
      },
      success: function (res) {
        // console.log(res)
        var start = res.data.body[0]
        if (res.data.head.status == 'success') {
          that.setData({
            CGUnitName: start.CGUnitName,
            startDate: start.startDate,
            storehouseName: start.storehouseName,
            memoInfo: start.memoInfo,
            totalMoney: start.totalMoney,
            freightFee: start.freightFee,
            actualMoney: start.actualMoney,
            dueMoney: start.dueMoney,
            receivedMoney: start.receivedMoney,
            profits: start.profits,
            moneyMode: start.moneyMode,
            accountName: start.accountName,
            employeeName: start.employeeName,
            PBAddress: start.PBAddress,
            freightCompany: start.freightCompany,
            freightNumber: start.freightNumber,
            cutMoney: start.cutMoney
          })
        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }

      }
    });
  },
  // 获取center列表
  couterlist: function (op,billnumbers) {
    var that = this
    // console.log(billnumbers)
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getSellDetailDataByBillNumber.ashx',
      data: {
        openID: op,
        billNumber: billnumbers
      },
      success: function (res) {
        // console.log(res)
        if (res.data.head.status == 'success') {
          that.setData({
            centerlist: res.data.body
          })
        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }

      }
    });
  },
  details: function (e) {
    // console.log(e.currentTarget.dataset)
    var sta = e.currentTarget.dataset
    wx.navigateTo({
      url: '../lmm_history/lmm_history?countms=' + sta.countms + '&countps=' + sta.countps + '&meterlists=' + sta.meterlists + '&names=' + sta.names,
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
    var that = this
    return {
      title: '发送码单',
      path: 'pages/codes/codes?opendsset=' + that.data.op + '&bill=' + that.data.bill,
    }
  }
})