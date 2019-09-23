// pages/xm_model/xm_model.js
var AjaxUrl = require('../../utils/util.js');
var newarr = []
var opends;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagesi: 20,
    pagein: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    newarr=[]
    that.setData({
      ids: options.ids,
      data1: options.data1,
      data2: options.data2
    })
    that.getdata(options)
  },
  getdata: function (options){
    var that = this
    opends = wx.getStorageSync('BL_openid')
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getSellStaticProductDetail.ashx',
      data: {
        openID: opends,
        productID: that.data.ids,
        pageSize: that.data.pagesi,
        pageIndex: that.data.pagein,
        startDate: that.data.data1,
        endDate: that.data.data2,
      },
      success: function (res) {
        // console.log(res)
        if (res.data.head.status == 'success') {
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
              lists: newarr
            })
          }
          // for (var i = 0; i < res.data.body.length; i++){
          //   newarr.push(res.data.body[i])
          // }
          // that.setData({
          //   lists: newarr
          // })
        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }

      }
    });
  },
  searchScrollLower:function(){
    var that = this;
    that.data.pagein++;
    that.getdata()
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