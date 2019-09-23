const { $Message } = require('../../dist/base/index');
var AjaxUrl = require('../../utils/util.js');
var newarr = []
var codesdan = []
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
    khname: ''


  },
  handlerCloseButton(e) {
    console.log(123)
    this.setData({
      visible2: false,
      toggle: this.data.toggle ? false : true
    });
  },
  // 取消弹窗
  quxiao: function () {
    var that = this
    that.setData({
      hiddemsg: false
    })
  },
  // 设置弹窗
  setting: function (e) {
    var that = this
    // console.log(e.currentTarget.dataset)
    that.setData({
      hiddemsg: true,
      goodsname: e.currentTarget.dataset.names,
      goodsnum: e.currentTarget.dataset.num,
      goodsid: e.currentTarget.dataset.goodsid
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    opends = wx.getStorageSync('BL_openid')
  },
  seach: function () {
    newarr = []
    var that = this
    that.all_list('seach')
  },
  all_list: function (seach) {
    var that = this
    wx.showLoading({
      title: '正在加载.',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'GetReadySellProduct.ashx',
      data: {
        openID: opends,
        search: that.data.inputs
      },
      success: function (res) {
        wx.hideLoading()
        newarr = res.data.body
        if (res.data.body == '') {
          that.setData({
            noens: true,
            lists: newarr,
          })
        } else {
          for (var i = 0; i < res.data.body.length; i++) {
            newarr[i].chaecktruefalse = false
          }
          that.setData({
            noens: false,
            lists: newarr
          })
        }
        console.log(newarr)
      }
    });
  },
  styles: function (e) {
    var that = this
    that.setData({
      indexs: e.currentTarget.dataset.indxs
    })
  },
  // 全选
  allchage: function (e) {
    var that = this
    codesdan = []
    if (e.detail.value.length == 1) {
      for (var i = 0; i < newarr.length; i++) {
        newarr[i].chaecktruefalse = true
        codesdan = newarr
      }
    } else {
      for (var i = 0; i < newarr.length; i++) {
        newarr[i].chaecktruefalse = false
        codesdan = []
      }
    }
    that.setData({
      lists: newarr
    })
  },
  phonedInput: function (e) {
    var that = this;
    that.setData({
      inputs: e.detail.value
    })
  },
  // 选择
  checkboxChange: function (e) {
    var that = this
    var chlength = []
    codesdan = []
    if (newarr[e.currentTarget.dataset.indes].chaecktruefalse == true) {
      newarr[e.currentTarget.dataset.indes].chaecktruefalse = false
    } else {
      newarr[e.currentTarget.dataset.indes].chaecktruefalse = true
    }

    for (var i = 0; i < newarr.length; i++) {
      if (newarr[i].chaecktruefalse == true) {
        chlength.push(newarr[i].chaecktruefalse)
        codesdan.push(newarr[i])
      }
    }
    if (newarr.length == chlength.length) {
      that.setData({
        allcheckbox: true
      })
    } else {
      that.setData({
        allcheckbox: false
      })
    }
    that.setData({
      lists: newarr
    })
  },

  // 设置客户
  khname: function (e) {
    var that = this
    // console.log(e.detail.value)
    that.setData({
      khname: e.detail.value
    })
  },
  // 保存
  succw: function () {
    var that = this
    wx.showLoading({
      title: '正在保存...',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'SetProductCustomer.ashx',
      data: {
        openID: opends,
        id: that.data.goodsid,
        customerName: that.data.khname
      },
      success: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: res.data.head.msg,
          icon: 'none',
          duration: 2000,
        })
        setTimeout(function () {
          that.setData({
            hiddemsg: false,
          })
          that.all_list()
        }, 2000)
      }
    });
  },
  // 取消
  closebackhiddemsg: function () {
    var that = this
    that.setData({
      backhiddemsg: false
    })
  },
  // 撤回
  withdraw: function (e) {
    var that = this
    that.setData({
      backhiddemsgxh: e.currentTarget.dataset.names,
      backhiddemsgnum: e.currentTarget.dataset.num,
      goodsid: e.currentTarget.dataset.goodsid
    })
    if (e.currentTarget.dataset.iscut != 2) {
      that.setData({
        backhiddemsg: true,
      })
    } else {
      that.setData({
        backhiddemsg2: true,
      })
    }
  },
  // 确定返仓
  succbackhiddemsg: function (e) {
    var that = this
    wx.showLoading({
      title: '正在返回...',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'BackStorehouse.ashx',
      data: {
        openID: opends,
        id: that.data.goodsid,
        type: 0
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if (res.data.result == 'true') {
          wx.showToast({
            title: '返仓成功！',
            icon: 'none',
            duration: 2000,
          })
        } else {
          wx.showToast({
            title: res.data.result,
            icon: 'none',
            duration: 2000,
          })
        }
        setTimeout(function () {
          that.setData({
            backhiddemsg: false,
          })
          that.all_list()
        }, 2000)
      }
    });
  },
  backoldgoods: function () {
    var that = this
    wx.showLoading({
      title: '正在返回...',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'BackStorehouse.ashx',
      data: {
        openID: opends,
        id: that.data.goodsid,
        type: 2
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if (res.data.result == 'true') {
          wx.showToast({
            title: '返仓成功！',
            icon: 'none',
            duration: 2000,
          })
        } else {
          wx.showToast({
            title: res.data.result,
            icon: 'none',
            duration: 2000,
          })
        }
        setTimeout(function () {
          that.setData({
            backhiddemsg2: false,
          })
          that.all_list()
        }, 2000)
      }
    });
  },
  backoldgoods2: function () {
    var that = this
    wx.showLoading({
      title: '正在返回...',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'BackStorehouse.ashx',
      data: {
        openID: opends,
        id: that.data.goodsid,
        type: 1
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if (res.data.result == 'true') {
          wx.showToast({
            title: '返仓成功！',
            icon: 'none',
            duration: 2000,
          })
        } else {
          wx.showToast({
            title: res.data.result,
            icon: 'none',
            duration: 2000,
          })
        }
        setTimeout(function () {
          that.setData({
            backhiddemsg2: false,
          })
          that.all_list()
        }, 2000)
      }
    });
  },
  // 关闭
  closehiddemsg2: function () {
    var that = this
    that.setData({
      backhiddemsg2: false,
    })
  },
  // 生成码单按钮
  codes: function (e) {
    wx.showLoading({
      title: '请稍后...',
    })
    console.log(codesdan.length)
    if (codesdan.length == '') {
      wx.showToast({
        title: '请选择布匹！',
        icon:'none'
      })
    } else {
      wx.setStorageSync('codesmd', codesdan)
      setTimeout(function () {
        wx.hideLoading()
        wx.navigateTo({
          url: '../addsales_childer/addsales_childer',
        })
      }, 1000)
    }

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
    newarr = []
    var chlength = []
    codesdan = []
    that.setData({
      heights: (app.globalData.hh * 2),
    })
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