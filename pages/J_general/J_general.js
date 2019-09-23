// pages/J_general/J_general.js
var AjaxUrl = require('../../utils/util.js');
var opends;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexs: 0,
    stylesjing: 0,
    date1: '',
    date2: ''
  },
  // 日期切换
  styles: function (e) {
    var that = this
    that.setData({
      indexs: e.currentTarget.dataset.indxs
    })
  },
  // 跳转欠款查询
  q_debt: function () {
    wx.navigateTo({
      url: '../q_debt/q_debt',
    })
  },
  // 库存
  k_regier: function () {
    wx.navigateTo({
      url: '../k_regier/k_regier',
    })
  },
  // 销售历史
  l_history: function () {
    wx.navigateTo({
      url: '../l_history/l_history',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    opends = wx.getStorageSync('BL_openid')
    that.allqiankuan()
    that.alertCount()
    that.gaifun_date(0)
    that.gaifun_date(-1)
    that.gaifun_date(-7)
    that.gaifun_date(-30)
    that.yestotalMoneys()
    that.getStockStatic()
    that.qitianotalMoneys()
    that.threeotalMoneys()
    that.tonggaifun_date(-7)
    that.qitongqilMoneys()
    that.tonggaifun_date(-30)
    that.qitongthreelMoneys()
    that.gaiareaseach()
    that.tedetoorgaifun_date(0)
  },
  // 获取总欠款
  allqiankuan: function () {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getCustomerOwnMoneyTotal.ashx',
      data: {
        openID: opends,
      },
      success: function (res) {
        if (res.data.head.status == 'success') {
          that.setData({
            category: res.data.body[0].totalDueMoney,
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
  // 获取成本数
  getStockStatic: function () {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getStockStatic.ashx',
      data: {
        openID: opends,
        productIDName: '',
        storehouseID: -1,
        parentID: -1
      },
      success: function (res) {
        // console.log(res)
        if (res.data.head.status == 'success') {
          that.setData({
            totalMoney: res.data.body[0].totalMoney,
            totalCountM: res.data.body[0].totalCountM,
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
  // 报警个数
  alertCount: function () {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getStockAlertCount.ashx',
      data: {
        openID: opends,
      },
      success: function (res) {
        if (res.data.head.status == 'success') {
          that.setData({
            alertCount: res.data.body[0].alertCount,
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
  gaifun_date: function (aa) {
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
    if (aa == 0) {
      that.setData({
        gaiareaseach1: time1,
        gaiareaseach1: time1,
      })
    } else if (aa == -1) {
      that.setData({
        yesdate1: time2,
        yesdate2: time2,
      })
    } else if (aa == -7) {
      that.setData({
        qitianotalMoneys1: time1,
        qitianotalMoneys2: time2,
      })
    } else if (aa == -30) {
      that.setData({
        threeotalMoneys1: time1,
        threeotalMoneys2: time2,
      })
    }
  },

  // 获取销售金额
  gaiareaseach: function (seach) {
    var that = this
    wx.showLoading({
      title: '正在加载...',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getSellStatic.ashx',
      data: {
        openID: opends,
        CGUnitName: '',
        startDate: that.data.gaiareaseach1,
        endDate: that.data.gaiareaseach1,
      },
      success: function (res) {
        console.log(res)
        if (res.data.head.status == 'success') {
          wx.hideLoading()
          that.setData({
            gaitotalMoneys: res.data.body[0].totalMoney
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
  // 昨天销售
  yestotalMoneys: function (seach) {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getSellStatic.ashx',
      data: {
        openID: opends,
        CGUnitName: '',
        startDate: that.data.yesdate2,
        endDate: that.data.yesdate2,
      },
      success: function (res) {
        console.log(res)
        console.log(that.data.yesdate2)
        if (res.data.head.status == 'success') {
          that.setData({
            yestotalMoneys: res.data.body[0].totalMoney
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
  // 七天
  qitianotalMoneys: function (seach) {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getSellStatic.ashx',
      data: {
        openID: opends,
        CGUnitName: '',
        startDate: that.data.qitianotalMoneys2,
        endDate: that.data.qitianotalMoneys1,
      },
      success: function (res) {
        console.log(res)
        console.log(that.data.qitianotalMoneys2)
        console.log(that.data.qitianotalMoneys1)
        if (res.data.head.status == 'success') {
          that.setData({
            qitianotalMoneys: res.data.body[0].totalMoney
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
  // 三十天
  threeotalMoneys: function (seach) {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getSellStatic.ashx',
      data: {
        openID: opends,
        CGUnitName: '',
        startDate: that.data.threeotalMoneys2,
        endDate: that.data.threeotalMoneys1,
      },
      success: function (res) {
        // console.log(res)
        // console.log(that.data.threeotalMoneys2)
        // console.log(that.data.threeotalMoneys1)
        if (res.data.head.status == 'success') {
          that.setData({
            threeotalMoneys: res.data.body[0].totalMoney
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
  // 同期日期
  tonggaifun_date: function (aa) {
    var that = this
    var date1 = new Date(),
      time1 = date1.getFullYear() - 1 + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();//time1表示当前时间
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + aa);
    var time2 = date2.getFullYear() - 1 + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
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
    if (aa == -7) {
      that.setData({
        qitongqilMoneys1: time1,
        qitongqilMoneys2: time2,
      })
    } else if (aa == -30) {
      that.setData({
        qitongthreelMoneys1: time1,
        qitongthreelMoneys2: time2,
      })
    }
  },
  // 七天同期
  qitongqilMoneys: function (seach) {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getSellStatic.ashx',
      data: {
        openID: opends,
        CGUnitName: '',
        startDate: that.data.qitongqilMoneys2,
        endDate: that.data.qitongqilMoneys1,
      },
      success: function (res) {
        if (res.data.head.status == 'success') {
          that.setData({
            qitongqilMoneys: res.data.body[0].totalMoney
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
  // 三十天同期
  qitongthreelMoneys: function (seach) {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getSellStatic.ashx',
      data: {
        openID: opends,
        CGUnitName: '',
        startDate: that.data.qitongthreelMoneys2,
        endDate: that.data.qitongthreelMoneys1,
      },
      success: function (res) {
        if (res.data.head.status == 'success') {
          that.setData({
            qitongthreelMoneys: res.data.body[0].totalMoney
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
  stylesjing: function (e) {
    var that = this
    that.setData({
      stylesjing: e.currentTarget.dataset.stylesjing
    })
    if (e.currentTarget.dataset.stylesjing == 0) {
      that.tedetoorgaifun_date(0)
    } else if (e.currentTarget.dataset.stylesjing == 1) {
      that.tedetoorgaifun_date(-1)
    } else if (e.currentTarget.dataset.stylesjing == 2) {
      that.tedetoorgaifun_date(-7)
    } else if (e.currentTarget.dataset.stylesjing == 3) {
      that.tedetoorgaifun_date(-30)
    }
  },
  ajaallday: function () {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getSellStatic.ashx',
      data: {
        openID: opends,
        CGUnitName: '',
        startDate: that.data.ajaallday2,
        endDate: that.data.ajaallday1,
      },
      success: function (res) {
        // console.log(res)
        if (res.data.head.status == 'success') {
          that.allshou()
          that.setData({
            allqitongthreesellCounts: res.data.body[0].sellCount,
            allqitongthreeltotalMoney: res.data.body[0].totalMoney,
            allqitongthreetotalProfits: res.data.body[0].totalProfits,
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
  allshou:function(){
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getReceivedMoneyTotal.ashx',
      data: {
        openID: opends,
        CGUnitName: '',
        startDate: that.data.ajaallday2,
        endDate: that.data.ajaallday1,
      },
      success: function (res) {
        // console.log(res)
        if (res.data.head.status == 'success') {
          that.setData({
            shouru: res.data.body[0].totalReceivedMoney
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
  // 同期日期
  tedetoorgaifun_date: function (aa) {
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
    if (aa == 0) {
      that.setData({
        ajaallday1: time1,
        ajaallday2: time2,
      })
    } else if (aa == -1) {
      that.setData({
        ajaallday1: time2,
        ajaallday2: time2,
      })
    } else if (aa == -7) {
      that.setData({
        ajaallday1: time1,
        ajaallday2: time2,
      })
    } else if (aa == -30) {
      that.setData({
        ajaallday1: time1,
        ajaallday2: time2,
      })
    }
    that.ajaallday()
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