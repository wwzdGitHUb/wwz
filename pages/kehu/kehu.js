// pages/kehu/kehu.js
var AjaxUrl = require('../../utils/util.js');
const { $Message } = require('../../dist/base/index');
var newarr = []
var opends;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pagesi: 10,
    pagein: 1,
    inputs: '',
    noens: false,
    visible2: false,
    //小程序没有refs，所以只能用动态布尔值控制关闭
    toggle: false,
    succ: false,
    messa: ''

  },
  // 客户明细
  kehudetail: function (e) {
    console.log(e.currentTarget.dataset)
    var STA = e.currentTarget.dataset
    wx.navigateTo({
      url: '../kehudetail/kehudetail?names=' + STA.names + '&addre=' + STA.addre + '&beizhu=' + STA.beizhu + '&ch=' + STA.ch + '&citys=' + STA.citys + '&gu1=' + STA.gu1 + '&guhua1=' + STA.guhua1 + '&guhua2=' + STA.guhua2 + '&guhua3=' + STA.guhua3 + '&guhua4=' + STA.guhua4 + '&pho=' + STA.pho + '&provinces=' + STA.provinces,
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
    that.items('seach')
  },

  // 点击事件
  phonecallevent: function (e) {
    var that = this
    var numbers = new Number(e.currentTarget.dataset.mobilephones);
    var mobi = numbers.toString()
    wx.makePhoneCall({
      phoneNumber: mobi
    })
  },
  // 复制手机号
  copyTBL: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.pho,
      success: function (res) {
        wx.hideToast();
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '手机号复制成功！',
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    opends = wx.getStorageSync('BL_openid')
    console.log(options.addsal)
    if (options.addsal == 'blocknone') {
      that.setData({
        succ: true
      })
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            heights: res.windowHeight - 120,
          })
        }
      })
    } else {
      that.setData({
        succ: false
      })
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            heights: res.windowHeight - 80,
          })
        }
      })
    }
    newarr = []
    that.setData({
      pagesi: 10,
      pagein: 1
    })
    that.items()
  },
  // 单选
  radioChange: function (e) {
    var that = this
    that.setData({
      messa: e.detail.value
    })
  },
  // 确认选择
  getsucc: function () {
    var that = this
    if (that.data.messa == '') {
      wx.showToast({
        title: '请选择客户！',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '请稍后...',
      })
      wx.setStorageSync('messa', that.data.messa)
      setTimeout(function () {
        wx.hideLoading()
        wx.navigateBack({})
      }, 1000)
    }
  },
  items: function (seach) {
    var that = this
    wx.showLoading({
      title: '正在加载...',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getCustomerList.ashx',
      data: {
        openID: opends,
        con: that.data.inputs,
        pageSize: that.data.pagesi,
        pageIndex: that.data.pagein
      },
      success: function (res) {
        console.log(res)
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
  searchScrollLower: function () {
    var that = this
    that.data.pagein++
    that.items()
  },
  addper: function () {
    var that = this;
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
    var addstys = wx.getStorageSync('addsty')
    if (addstys == -1) {
      newarr = []
      that.setData({
        pagesi: 10,
        pagein: 1
      })
      that.items()
      wx.removeStorageSync('addsty')
    }


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