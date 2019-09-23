// pages/l_history/l_history.js
var AjaxUrl = require('../../utils/util.js');
var newarr = []
var opends;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexs: 0,
    blocks: false,
    pagesi: 10,
    pagein: 1,
    inputs: '',
    warehouseids: [],
    productids: [],
    styles: 0,
    styless: -1,
    stylestows: -1,
    showtrfl: false,
    category: [

    ],
    categorytow: [

    ],
    date1: '',
    date2: ''
  },



  // 仓库
  changes: function (e) {
    var num = e.detail.value;
    var that = this
    newarr = []
    this.setData({
      styles: num,
      styless: that.data.warehouseids[num],
      pagesi: 10,
      pagein: 1,
      scrollTop: 0
    })
    that.repertory('seach')
  },
  // 产品
  changestown: function (e) {
    var num = e.detail.value;
    var that = this
    newarr = []
    this.setData({
      stylestow: num,
      stylestows: that.data.productids[num],
      pagesi: 10,
      pagein: 1,
      scrollTop: 0
    })
    that.repertory('seach')
  },
  // 详细
  km_regier: function (e) {
    console.log(e.currentTarget.dataset)
    var start = e.currentTarget.dataset
    wx.navigateTo({
      url: '../km_regier/km_regier?countm=' + start.countm + '&countp=' + start.countp + '&parentid=' + start.parentid + '&productid=' + start.productid + '&productidname=' + start.productidname + '&storehouseid=' + start.storehouseid,
    })
  },
  // 显示报警
  checkboxChange: function (e) {
    var that = this
    if (e.detail.value[0] == 1) {
      that.setData({
        showtrfl: true
      })
    } else {
      that.setData({
        showtrfl: false
      })
    }
    newarr = []
    that.setData({
      pagesi: 10,
      pagein: 1,
      scrollTop: 0
    })
    that.repertory('seach')
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
      pagein: 1,
      scrollTop: 0
    })
    that.repertory('seach')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    opends = wx.getStorageSync('BL_openid')
    this.setData({
      pagesi: 10,
      pagein: 1
    })
    newarr = []
    that.warehouse()
    that.product()
    that.repertory()
  },
  // 仓库列表
  warehouse: function () {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getStorehouseList.ashx',
      data: {
        openID: opends,
      },
      success: function (res) {
        // console.log(res)
        if (res.data.head.status == 'success') {
          var arr = [],
            ids = [];
          for (var i = 0; i < res.data.body.length; i++) {
            arr.push(res.data.body[i].storehouseName)
            ids.push(res.data.body[i].id)
          }
          that.setData({
            category: arr,
            warehouseids: ids
          })

        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }
      }
    })
  },
  // 产品大类列表
  product: function () {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getCategoryList.ashx',
      data: {
        openID: opends,
      },
      success: function (res) {
        // console.log(res)
        if (res.data.head.status == 'success') {
          var arr = [],
            ids = [];
          for (var i = 0; i < res.data.body.length; i++) {
            arr.push(res.data.body[i].categoryName)
            ids.push(res.data.body[i].id)
          }
          that.setData({
            categorytow: arr,
            productids: ids
          })

        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }
      }
    })
  },
  // 主列表
  repertory: function (seach) {
    var that = this
    // console.log(that.data.styless)
    // console.log(that.data.stylestows)
    wx.showLoading({
      title: '正在加载...',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getStock.ashx',
      data: {
        openID: opends,
        productIDName: that.data.inputs,
        pageSize: that.data.pagesi,
        pageIndex: that.data.pagein,
        storehouseID: that.data.styless,
        parentID: that.data.stylestows,
        showAlert: that.data.showtrfl
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
          that.allmoney()
        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }

      }
    });
  },
  // 获取总数
  allmoney: function () {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getStockStatic.ashx',
      data: {
        openID: opends,
        productIDName: that.data.inputs,
        storehouseID: that.data.styless,
        parentID: that.data.stylestows,
      },
      success: function (res) {
        // console.log(res)
        if (res.data.head.status == 'success') {
          that.setData({
            totalCountM: res.data.body[0].totalCountM,
            totalCountP: res.data.body[0].totalCountP,
            totalMoney: res.data.body[0].totalMoney
          })
        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }
      }
    })
  },
  searchScrollLower: function () {
    var that = this
    that.data.pagein++
    that.repertory()
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