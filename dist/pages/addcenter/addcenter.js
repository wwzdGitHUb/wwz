var app = getApp()
// pages/mx_index/mx_index.js
var AjaxUrl = require('../../utils/util.js');
var newarr = []
var opends;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // hiddenmodalput: false,
    // hiddenmodalremind: false,
    hiddemsg: false,
    noens: false,
    tableList: [],
    memoInfo: '',
    clicks: 0,
    pagesi: 15,
    pagein: 1,
    inputs: '',
    wxSearchvalue: '',
    marzoni: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    opends = wx.getStorageSync('BL_openid')
    newarr = []
    that.setData({
      heights: app.globalData.hh + 'px',

      pagein: 1,
      pagesi: 15,
    })
    that.goodsnumber('seach')
  },
  // 查询产品编号
  goodsnumber: function (seach) {
    var that = this
    wx.showLoading({
      title: '正在加载...',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'SearchProductIDName.ashx',
      data: {
        openID: opends,
        productIDName: that.data.wxSearchvalue,
        pageSize: that.data.pagesi,
        pageIndex: that.data.pagein,
      },
      success: function (res) {
        // console.log(res)
        setTimeout(function () {
          wx.hideLoading()
          if (res.data.head.status == 'success') {
            if (res.data.body == '') {
              if (seach == 'seach') {
                that.setData({
                  noens: true,
                  lists: newarr,
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
                lists: newarr,
                ids: newarr[0].id,
                goodsname: newarr[0].productIDName,
              })
            }
            if (seach != 'nones') {
              that.goodslist(seach)
            }
          } else {
            wx.showToast({
              title: res.data.head.msg,
              icon: "none"
            })
          }
        }, 1000)
      }
    });
  },
  goodslist: function (seach) {
    var that = this
    if (seach != 'nones') {
      wx.showLoading({
        title: '正在加载...',
        mask: true
      })
    }
    wx.request({
      url: AjaxUrl.AjaxUrl + 'GetStockByProductID.ashx',
      data: {
        openID: opends,
        productID: that.data.ids,
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading()
        if (res.data.head.status == 'success') {
          that.setData({
            tableList: res.data.body,
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
  // 零剪布匹
  marzoni: function (e) {
    var that = this
    that.setData({
      marzoni: e.detail.value
    })
  },
  marzoniclick: function () {
    var that = this
    // console.log(that.data.lingid)
    // console.log(that.data.marzoni)
    // console.log(that.data.rowIndex)
    if (that.data.marzoni < 0 || that.data.marzoni == '' || that.data.marzoni == 0) {
      wx.showToast({
        title: '零剪布匹需大于0！',
        icon: 'none',
      })
    } else if (Number(that.data.marzoni) > Number(that.data.mete)) {
      wx.showToast({
        title: '零剪布匹需小于数量！',
        icon: 'none',
      })
    } else if (Number(that.data.marzoni) == Number(that.data.mete)) {
      wx.showToast({
        title: '请执行整批出售！',
        icon: 'none',
      })
    } else {
      wx.showLoading({
        title: '正在零剪...',
        mask: true
      })
      wx.request({
        url: AjaxUrl.AjaxUrl + 'SellProductCut.ashx',
        data: {
          openID: opends,
          id: that.data.lingid,
          cutMeter: that.data.marzoni,
          rowIndex: that.data.rowIndex,
        },
        success: function (res) {
          wx.hideLoading()
          wx.showToast({
            title: res.data.head.msg,
            icon: "none",
            duration: 2000,
            success: function () {
              setTimeout(function () {
                that.setData({
                  hiddemsg: false,
                })
                that.goodslist()
              }, 2000)

            }
          })
        }
      });
    }
  },
  // 整批出售
  batch: function () {
    var that = this
    wx.showLoading({
      title: '正在出售...',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'SellProductAll.ashx',
      data: {
        openID: opends,
        id: that.data.lingid,
        rowIndex: that.data.rowIndex,
      },
      success: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: res.data.head.msg,
          icon: "none",
          duration: 2000,
          success: function () {
            setTimeout(function () {
              that.setData({
                hiddemsg: false,
              })
              that.goodslist()
            }, 2000)
          }
        })
      }
    });
  },
  // 数量
  numlength: function (e) {
    var that = this;
    that.setData({
      mete: e.detail.value
    })
  },
  // 缸号
  ghproductGH: function (e) {
    var that = this;
    that.setData({
      productGH: e.detail.value
    })
  },
  // 备注
  memoInfo: function (e) {
    var that = this;
    that.setData({
      memoInfo: e.detail.value
    })
  },
  // 修改布匹
  modification: function () {
    var that = this;
    if (that.data.mete == 0) {
      wx.showToast({
        title: '数量不能为0！',
        icon: 'none'
      })
    } else if (that.data.mete < 0) {
      wx.showToast({
        title: '数量不能小于0！',
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '正在修改..',
        mask: true
      })
      wx.request({
        url: AjaxUrl.AjaxUrl + 'ModProduct.ashx',
        data: {
          openID: opends,
          id: that.data.lingid,
          rowIndex: that.data.rowIndex,
          newMeter: that.data.mete,
          productGH: that.data.productGH,
          memoInfo: that.data.memoInfo
        },
        success: function (res) {
          console.log(res)
          wx.hideLoading()
          wx.showToast({
            title: res.data.head.msg,
            icon: "none",
            duration: 2000,
            success: function () {
              setTimeout(function () {
                that.setData({
                  hiddemsg: false,
                  memoInfo: ''
                })
                that.goodslist()
              }, 2000)

            }
          })
        }
      });
    }
  },
  orderClick: function (e) {
    var that = this
    that.setData({
      clicks: e.currentTarget.dataset.indexs,
      ids: e.currentTarget.dataset.ids,
      goodsname: e.currentTarget.dataset.goodsname,
    })
    that.goodslist()
  },
  // 查看代销布匹
  selected: function () {
    wx.navigateTo({
      url: '../addsales/addsales',
    })
  },
  // 取消弹窗
  quxiao: function () {
    var that = this
    that.setData({
      hiddemsg: false
    })
  },
  // 显示弹窗
  checkedgoods: function (e) {
    var that = this
    console.log(e)
    that.setData({
      mete: e.currentTarget.dataset.meter,
      productGH: e.currentTarget.dataset.productgh,
      lingid: e.currentTarget.dataset.ids,
      rowIndex: e.currentTarget.dataset.rowindex,
      memoInfo: e.currentTarget.dataset.memoinfo,
      hiddemsg: true,
      marzoni: ''
    })
  },
  // 刷新库存米数
  refurbish: function () {
    var that = this
    that.goodslist()
  },
  // 点击问号
  mark: function () {
    var that = this;
    wx.showModal({
      title: '说明',
      content: '红色代表已零剪，黑色代表未零剪！',
      showCancel: false,
    })
  },
  // 左侧查找
  SeachInput: function (e) {
    var that = this
    that.setData({
      wxSearchvalue: e.detail.value
    })
  },
  seach: function (e) {
    var that = this
    newarr = []
    that.setData({
      pagein: 1,
      pagesi: 15,
      clicks: 0,
      scrollTop: 0
    })
    that.goodsnumber('seach')
  },
  // 左侧上拉加载
  searchScrollLower: function () {
    var that = this
    that.data.pagein++
    that.goodsnumber('nones')
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