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
    date1: '',
    date2: '',
    pagesi: 10,
    pagein: 1,
    inputs: '',
    noens: false,
    Start: 0,
    ends: 1000,
    DaysStart: 0,
    Daysend: 365,
    category: [
      '所有', '一', '一一', '一一一', '一一一一', '一一一一一'
    ],
    categorytow: [
      '所有','*', '**', '***', '****', '*****',
    ],

  },
  fun_date: function (aa) {
    var that = this
    var date1 = new Date(),
      time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();//time1表示当前时间
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
    if (aa == -30) {
      that.setData({
        date1: time2,
        date2: time1,
      })
    } else if (aa == -90) {
      that.setData({
        date1: time2,
        date2: time1,
      })
    } else if (aa == -180) {
      that.setData({
        date1: time2,
        date2: time1,
      })
    } else if (aa == -365) {
      that.setData({
        date1: time2,
        date2: time1,
      })
    }

    that.getCustomerActiveness()
  },
  // 日期切换
  styles: function (e) {
    var that = this
    newarr = []
    that.setData({
      pagesi: 10,
      pagein: 1,
      scrollTop: 0,
      indexs: e.currentTarget.dataset.indxs
    })
    if (e.currentTarget.dataset.indxs == 0) {
      that.fun_date(-30)
    } else if (e.currentTarget.dataset.indxs == 1) {
      that.fun_date(-90)
    } else if (e.currentTarget.dataset.indxs == 2) {
      that.fun_date(-180)
    } else if (e.currentTarget.dataset.indxs == 3) {
      that.fun_date(-365)
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
    that.getCustomerActiveness('seach')
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
  // 明细
  gonavs: function () {
    wx.navigateTo({
      url: '../lm_history/lm_history',
    })
  },
  // 销售贡献
  changes: function (e) {
    var that = this
    var num = e.detail.value;
    var indexs = num.split("")[0]
    newarr = []
    that.setData({
      pagesi: 10,
      pagein: 1,
      styles: num
    })

    if (indexs == 0) {
      that.setData({
        Start: 0,
        ends: 1000
      })
    } else if (indexs == 1) {
      that.setData({
        Start: 0,
        ends: 19
      })
    } else if (indexs == 2) {
      that.setData({
        Start: 20,
        ends: 39
      })

    } else if (indexs == 3) {
      that.setData({
        Start: 40,
        ends: 49
      })

    } else if (indexs == 4) {
      that.setData({
        Start: 50,
        ends: 99
      })
    } else if (indexs == 5) {
      that.setData({
        Start: 100,
        ends: 1000
      })
    }
    that.getCustomerActiveness('seach')
  },
  // 未交易
  changestown: function (e) {
    var that = this
    var num = e.detail.value;
    console.log(num.split("")[0])
    var indexs = num.split("")[0]
    newarr = []
    that.setData({
      pagesi: 10,
      pagein: 1,
      stylestow: num
    })
    if (indexs == 0) {
      that.setData({
        DaysStart: 0,
        Daysend: 365
      })
    } else if (indexs == 1) {
      that.setData({
        DaysStart: 31,
        Daysend: 90
      })
    } else if (indexs == 2) {
      that.setData({
        DaysStart: 11,
        Daysend: 30
      })
    } else if (indexs == 3) {
      that.setData({
        DaysStart: 4,
        Daysend: 10
      })
    } else if (indexs == 4) {
      that.setData({
        DaysStart: 0,
        Daysend: 3
      })
    }else{
      that.setData({
        DaysStart: 91,
        Daysend: 365
      })
    }
    that.getCustomerActiveness('seach')
  },
  // 活跃度详情跳转
  hm_liven: function (e) {
    var that = this
    var start = e.currentTarget.dataset
    wx.navigateTo({
      url: '../hm_liveness/hm_liveness?address=' + start.address + '&avgmoney=' + start.avgmoney + '&cgunitname=' + start.cgunitname + '&countnum=' + start.countnum + '&id=' + start.id + '&lastdate=' + start.lastdate + '&mobilephone=' + start.mobilephone + '&noselldays=' + start.noselldays + '&summoney=' + start.summoney + '&data1=' + that.data.date1 + '&data2=' + that.data.date2,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    opends = wx.getStorageSync('BL_openid')
    that.fun_date(-30)
  },

  getCustomerActiveness: function (seach) {
    var that = this
    // console.log(that.data.date1)
    wx.showLoading({
      title: '正在加载...',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getCustomerActiveness.ashx',
      data: {
        openID: opends,
        CGUnitName: that.data.inputs,
        pageSize: that.data.pagesi,
        pageIndex: that.data.pagein,
        startDate: that.data.date1,
        endDate: that.data.date2,
        noSellDaysStart: that.data.DaysStart,
        noSellDaysEnd: that.data.Daysend,
        XSGXDStart: that.data.Start,
        XSGXDEnd: that.data.ends
      },
      success: function (res) {
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
                var a = Number(res.data.body[i].XSGXD)
                var b = Number(res.data.body[i].noSellDays)
                if (a >= 0 && a <= 19) {
                  res.data.body[i].XSGXDs = 1
                } else if (a >= 20 && a <= 39) {
                  res.data.body[i].XSGXDs = 2
                } else if (a >= 40 && a <= 49) {
                  res.data.body[i].XSGXDs = 3
                } else if (a >= 50 && a <= 99) {
                  res.data.body[i].XSGXDs = 4
                } else if (a >= 100 && a <= 1000) {
                  res.data.body[i].XSGXDs = 5
                }else{
                  res.data.body[i].XSGXDs = 0
                }
                if (b >= 0 && b <= 3) {
                  res.data.body[i].nolDays = 5
                } else if (b >= 4 && b <= 10) {
                  res.data.body[i].nolDays = 4
                } else if (b >= 11 && b <= 30) {
                  res.data.body[i].nolDays = 3
                } else if (b>= 31 &&b <= 90) {
                  res.data.body[i].nolDays = 2
                } else if (b>= 91 && b <= 365) {
                  res.data.body[i].nolDays = 1
                }else{
                  res.data.body[i].nolDays = 0
                }
                newarr.push(res.data.body[i])
              }
              that.setData({
                noens: false,
                items: newarr,
              })
            }
          },10)
        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }
        console.log(res.data.body)
      }
    });
  },
  searchScrollLower: function () {
    var that = this
    that.data.pagein++
    that.getCustomerActiveness()
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