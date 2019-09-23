const { $Message } = require('../../dist/base/index');
var AjaxUrl = require('../../utils/util.js');
var newarr = []
var codesdan = []
var all=[]
var app = getApp()
var opends;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexs: 0,
    visible2: true,
    toggle: true,
    hiddemsg: false,
    allcheckbox: false,
    backhiddemsg: false,
    backhiddemsg2: false,
    inputs: '',
    items: [],
    khname: '',
    pagesi: 10,
    pagein: 1,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    opends = wx.getStorageSync('BL_openid')
  },
  phonedInput: function (e) {
    var that = this;
    that.setData({
      inputs: e.detail.value
    })
  },
  seach: function () {
    all = []
    var that = this
    that.setData({
      pagesi: 10,
      pagein: 1,
    })
    console.log(that.data.inputs)
    that.all_list('seach')
  },
  all_list: function (seach) {
    var that = this
    wx.showLoading({
      title: '正在加载.',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'SearchProductIDName.ashx',
      data: {
        openID: opends,
        pageSize: that.data.pagesi,
        pageIndex: that.data.pagein,
        productIDName: that.data.inputs
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        if (res.data.body == '') {
          if (seach =='seach'){
            that.setData({
              lists: '',
              noens: true
            })
          }else{
            that.setData({
              lists: all,
              noens: false
            })
            wx.showToast({
              title: '暂无数据！',
              icon:'none'
            })
          }
        } else {
          for (var i = 0; i < res.data.body.length; i++) {
            res.data.body[i].chaecktruefalse = false
            all.push(res.data.body[i])
            all[i].chaecktruefalse = false
          }
          that.setData({
            lists: all,
            noens: false
          })
        }
      }
    });
  },
  // 选择
  checkboxChange: function (e) {
    var that = this
    var chlength = []
   
    if (that.data.lists[e.currentTarget.dataset.indes].chaecktruefalse == true) {
      that.data.lists[e.currentTarget.dataset.indes].chaecktruefalse = false
    } else {
      that.data.lists[e.currentTarget.dataset.indes].chaecktruefalse = true
    }
    that.setData({
      lists: that.data.lists
    })
  },

  // 确定按钮
  codes: function (e) {
    var that = this
    wx.showLoading({
      title: '请稍后...',
    })
    var codesdan=[]
    for(var i=0;i<that.data.lists.length;i++){
      if (that.data.lists[i].chaecktruefalse==true){
        codesdan.push(that.data.lists[i])
      }
    }
    // console.log(codesdan)
    if (codesdan.length == '') {
      wx.showToast({
        title: '请选择布匹！',
        icon: 'none'
      })
    } else {
      wx.setStorageSync('number', codesdan)
      setTimeout(function () {
        wx.hideLoading()
        wx.setStorageSync('listtow', -1)
        wx.navigateBack({
          // url: '../addsales_childer_tow/addsales_childer_tow',
        })
      }, 1000)
    }
  },
  add: function () {
    var that = this
    wx.navigateTo({
      url: '../add/add',
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
    var that = this
    wx.removeStorageSync('number')
    newarr = []
    all=[]
    var chlength = []
    codesdan = []
    that.setData({
      pagesi: 10,
      pagein: 1,
    })
    that.setData({
      heights: (app.globalData.hh * 2),
    })
    that.all_list()
  },
  searchScrollLower: function () {
    var that = this
    that.data.pagein++
    that.all_list()
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