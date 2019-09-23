// pages/l_history/l_history.js
var AjaxUrl = require('../../utils/util.js');
var newarr = []
var opends;
Page({
  data: {
    indexs: 0,
    blocks: false,
    category: [
      '所有', '技术部', '门市部', 'A', 'B',
    ],
    date1: '',
    date2: '',
    pagesi: 10,
    pagein: 1,
    inputs: '',
    noens: false
  },
  fun_date: function (aa) {
    var that = this
    newarr = []
    var date1 = new Date(),
      time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate(); //time1表示当前时间
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + aa);
    var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
    var ti1 = time1.split("-")
    var ti2 = time2.split("-")
    var a1 = []
    a1.push(ti1[0])
    a1.push(ti1[1] < 10 ? '0' + ti1[1] : ti1[1])
    a1.push(ti1[2] < 10 ? '0' + ti1[2] : ti1[2])
    var a2 = []
    a2.push(ti2[0])
    a2.push(ti2[1] < 10 ? '0' + ti2[1] : ti2[1])
    a2.push(ti2[2] < 10 ? '0' + ti2[2] : ti2[2])
    var time1 = a1.join('-')
    var time2 = a2.join('-')
    if (aa == 0) {
      that.setData({
        date1: time1,
        date2: time1,
      })
    } else if (aa == -1) {
      that.setData({
        date1: time2,
        date2: time2,
      })
    } else if (aa == -7) {
      that.setData({
        date1: time2,
        date2: time1,
      })
    } else if (aa == -30) {
      that.setData({
        date1: time2,
        date2: time1,
      })
    }
    that.setData({
      pagesi: 10,
      pagein: 1
    })
    that.items('seach')
  },
  // 日期切换
  styles: function (e) {
    var that = this
    newarr = []
    that.setData({
      indexs: e.currentTarget.dataset.indxs,
      pagesi: 10,
      pagein: 1,
      scrollTop: 0
    })
    if (e.currentTarget.dataset.indxs == 0) {
      that.fun_date(0)
    } else if (e.currentTarget.dataset.indxs == 1) {
      that.fun_date(-1)
    } else if (e.currentTarget.dataset.indxs == 2) {
      that.fun_date(-7)
    } else if (e.currentTarget.dataset.indxs == 3) {
      that.fun_date(-30)
    }
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
  // 开始日期
  bindDateChange: function (e) {
    this.setData({
      date1: e.detail.value
    })
  },
  // 结束日期
  bindDateChange2: function (e) {
    this.setData({
      date2: e.detail.value
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    opends = wx.getStorageSync('BL_openid')
    that.fun_date(0)
  },
  // 请求
  items: function (seach) {
    var that = this
    // console.log(that.data.date1)
    wx.showLoading({
      title: '正在加载...',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getReceivedMoneyList.ashx',
      data: {
        openID: opends,
        CGUnitName: that.data.inputs,
        pageSize: that.data.pagesi,
        pageIndex: that.data.pagein,
        startDate: that.data.date1,
        endDate: that.data.date2,
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
          },1500)
          that.allmone()
        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }

      }
    });
  },
  // 获取收款总额
  allmone: function () {
    var that = this;
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getReceivedMoneyTotal.ashx',
      data: {
        openID: opends,
        CGUnitName: that.data.inputs,
        startDate: that.data.date1,
        endDate: that.data.date2,
      },
      success: function (res) {
        // console.log(res)
        that.setData({
          totalReceivedMoney: res.data.body[0].totalReceivedMoney
        })
      }
    })
  },
  searchScrollLower: function () {
    var that = this
    that.data.pagein++
    that.items()
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