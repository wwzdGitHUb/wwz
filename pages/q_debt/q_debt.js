// pages/q_debt/q_debt.js
var AjaxUrl = require('../../utils/util.js');
var newarr=[]
var opends;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagesi: 10,
    pagein: 1,
    inputs: '',
  },
  // 商品明细
  qm_debt: function (e) {
    // console.log(e.currentTarget.dataset)
    var start = e.currentTarget.dataset
    wx.navigateTo({
      url: '../qm_debt/qm_debt?ids=' + start.ids + '&name=' + start.names + '&pho=' + start.pho + '&dueMoneys=' + start.duemoneys,
    })
  },
  // 搜索输入
  phonedInput: function (e) {
    var that = this
    this.setData({
      inputs: e.detail.value
    })
  },
  // 搜索
  seach: function () {
    var that = this
    newarr = []
    that.setData({
      pagesi: 10,
      pagein: 1
    })
    that.lists('seach')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    opends = wx.getStorageSync('BL_openid')
    newarr = []
    that.setData({
      pagesi: 10,
      pagein: 1
    })
    that.lists()
  },
  lists: function (seach) {
    var that = this
    wx.showLoading({
      title: '正在加载...',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getCustomerOwnMoneyList.ashx',
      data: {
        openID: opends,
        con: that.data.inputs,
        pageSize: that.data.pagesi,
        pageIndex: that.data.pagein
      },
      success: function (res) {
        // console.log(res)
        if (res.data.head.status == 'success') {
          setTimeout(function () {
            wx.hideLoading()
            if (res.data.body == '') {
              if (seach == 'seach') {
                that.setData({
                  noens: true,
                  items: newarr,
                })
              } else {
                wx.showToast({
                  title: '暂无数据！',
                  icon: 'none',
                })
              }
            } else {
              for (var i = 0; i < res.data.body.length; i++) {
                newarr.push(res.data.body[i])
              }
              that.setData({
                noens: false,
                items: newarr,
              })
            }
          }, 800)
        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }

      }
    });
  },
  // 上拉加载
  searchScrollLower:function(){
    var that = this
    that.data.pagein++
    that.lists()
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
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getCustomerOwnMoneyTotal.ashx',
      data: {
        openID: opends, 
      },
      success: function (res) {
        // console.log(res)
        if (res.data.head.status == 'success') {
          that.setData({
            allq: res.data.body[0].totalDueMoney
          })
        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: 'none'
          })
        }
       
      }
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          heights: res.windowHeight - 110,
        })

      }
    })

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