// pages/mx_index/mx_index.js
var AjaxUrl = require('../../utils/util.js');
var newarr = []
var opends;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexs: 0,
    stylestime: 0,
    stylesjing: 0,
    styjing: 0,
    leftnav: 0,
    date1: '',
    date2: '',
    kehuseach: '',
    pagesi: 10,
    pagein: 1,
    idsvall: -1,
    inputs: '',
    Start: 0,
    ends: 1000,
    DaysStart: 0,
    Daysend: 365,
    seachinput: true,
    itemsistrue1: true,
    itemsistrue2: false,
    itemsistrue3: false,
    itemsistrue4: false,
    alltotamoney: true,
    xiaoshou: true,
    kehu: false,
    jingying: false,
    eachwrap: false,
    eachwrapsval: '',
    busectionval: '所有',
    eachwraps: '',
    busection: '',
    values: '所有',
    kehuname: '客户名称',
    xiaosh: '销售金额',
    input_place: '客户名称/简拼',
    category: [
      '所有', '一', '一一', '一一一', '一一一一', '一一一一一'
    ],
    categorytow: [
      '所有', '*', '**', '***', '****', '*****',
    ],

    // 经营概况

  },
  fun_date: function (aa) {
    var that = this
    newarr = []
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
    that.setData({
      pagesi: 10,
      pagein: 1,
      scrollTop: 0,
      date1: time2,
      date2: time1,
    })

  },
  // 搜索输入
  phonedInput: function (e) {
    var that = this
    this.setData({
      inputs: e.detail.value
    })
  },
  // 开始日期
  bindDateChange: function (e) {
    // console.log(e.detail.value)
    this.setData({
      date1: e.detail.value
    })
  },
  // 结束日期
  bindDateChange2: function (e) {
    // console.log(e.detail.value)
    this.setData({
      date2: e.detail.value
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
    if (that.data.xiaosh == '销售金额') {
      that.section('seach')
    } else if (that.data.xiaosh == '销售数量') {
      that.broad('seach')
    }
  },
  // 选择部门
  getsection: function (e) {
    var that = this
    newarr = []
    that.setData({
      pagesi: 10,
      pagein: 1,
      scrollTop: 0,
      values: that.data.section[e.detail.value]
    })
  },
  // 明细
  km_xpaihang: function (e) {
    var that = this
    var start = e.currentTarget.dataset
    wx.navigateTo({
      url: '../km_xpaihang/km_xpaihang?ids=' + start.ids + '&data1=' + that.data.date1 + '&data2=' + that.data.date2
    })
  },
  styles: function (e) {
    var that = this
    newarr = []
    that.setData({
      indexs: e.currentTarget.dataset.indxs,
      pagesi: 10,
      pagein: 1,
      scrollTop: 0,
      inputs: ''
    })
    if (e.currentTarget.dataset.indxs == 0) {
      that.section('seach')
      that.setData({
        input_place: '客户名称/简写',
        kehuname: '客户名称',
        xiaosh: '销售金额',
        itemsistrue1: true,
        itemsistrue2: false,
        itemsistrue3: false,
        itemsistrue4: false,
        seachinput: true,
        alltotamoney: true,
        eachwrap: false,
        values: that.data.section[0]
      })
    } else if (e.currentTarget.dataset.indxs == 1) {
      that.broad('seach')
      that.setData({
        input_place: '产品编号名称',
        kehuname: '产品编号',
        xiaosh: '销售数量',
        itemsistrue1: false,
        itemsistrue3: false,
        itemsistrue4: false,
        itemsistrue2: true,
        alltotamoney: true,
        seachinput: true,
        eachwrap: false,
        values: that.data.section[0]
      })
    } else if (e.currentTarget.dataset.indxs == 2) {
      that.salesman('seach')
      that.setData({
        kehuname: '业务员名称',
        xiaosh: '销售金额',
        itemsistrue1: false,
        itemsistrue3: true,
        itemsistrue2: false,
        itemsistrue4: false,
        alltotamoney: true,
        seachinput: false,
        eachwrap: false,
        values: that.data.section[0]
      })
    } else if (e.currentTarget.dataset.indxs == 3) {
      that.eachwrap('seach')
      that.busection('seach')
      that.setData({
        kehuname: '省份城市',
        xiaosh: '销售金额',
        itemsistrue1: false,
        itemsistrue3: false,
        itemsistrue2: false,
        itemsistrue4: true,
        seachinput: false,
        alltotamoney: false,
        eachwrap: true,
        values: that.data.section[0]
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    opends = wx.getStorageSync('BL_openid')
    that.fun_date(0)
    that.section('seach')
    // 经营概况
    that.allqiankuan('seach')
    that.alertCount('seach')
    that.gaifun_date(0)
    that.gaifun_date(-1)
    that.gaifun_date(-7)
    that.gaifun_date(-30)
    that.yestotalMoneys('seach')
    that.getStockStatic('seach')
    that.qitianotalMoneys('seach')
    that.threeotalMoneys('seach')
    that.tonggaifun_date(-7)
    that.qitongqilMoneys('seach')
    that.tonggaifun_date(-30)
    that.qitongthreelMoneys('seach')
    that.gaiareaseach('seach')
    that.tedetoorgaifun_date(0)
  },
  // 请求销售客户排行
  items: function (seach) {
    var that = this
    wx.showLoading({
      title: '正在加载...',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getSellStaticCGUnit.ashx',
      data: {
        openID: opends,
        CGUnitName: that.data.inputs,
        pageSize: that.data.pagesi,
        deptName: that.data.values,
        pageIndex: that.data.pagein,
        startDate: that.data.date1,
        endDate: that.data.date2,
      },
      success: function (res) {
        setTimeout(function () {
          wx.hideLoading()
        }, 1500)
        if (res.data.head.status == 'success') {
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
          that.allx()
        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }

      }
    });
  },
  // 客户销售总额
  allx: function () {
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
        if (res.data.head.status == 'success') {
          that.setData({
            totamoney: res.data.body[0].totalReceivedMoney,
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
  // 获取客户部门列表
  section: function (seach) {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getDeptList.ashx',
      data: {
        openID: opends,
      },
      success: function (res) {
        // console.log(res)
        var sectionarr = []
        if (res.data.head.status == 'success') {
          for (var i = 0; i < res.data.body.length; i++) {
            sectionarr.push(res.data.body[i].deptName)
          }
          that.setData({
            section: sectionarr
          })
          that.items(seach)
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
  searchScrollLower: function () {
    var that = this
    that.data.pagein++
    if (that.data.kehuname == '客户名称') {
      that.section()
    } else if (that.data.kehuname == '产品编号') {
      that.broad()
    } else if (that.data.kehuname == '业务员名称') {
      that.salesman()
    }
  },







  // 产品列表
  items2: function (seach) {
    var that = this
    wx.showLoading({
      title: '正在加载...',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getSellStaticProduct.ashx',
      data: {
        openID: opends,
        categoryName: that.data.values,
        productIDName: that.data.inputs,
        pageSize: that.data.pagesi,
        pageIndex: that.data.pagein,
        startDate: that.data.date1,
        endDate: that.data.date2,
      },
      success: function (res) {
        setTimeout(function () {
          wx.hideLoading()
        }, 1500)
        if (res.data.head.status == 'success') {
          if (res.data.body == '') {
            if (seach == 'seach') {
              that.setData({
                noens: true,
                items2: newarr,
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
              items2: newarr,
            })
          }
          that.allx()
        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }

      }
    });
  },
  // 获取产品大类名称
  broad: function (seach) {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getCategoryList.ashx',
      data: {
        openID: opends,
      },
      success: function (res) {
        // console.log(res)
        var sectionarr = []
        if (res.data.head.status == 'success') {
          for (var i = 0; i < res.data.body.length; i++) {
            sectionarr.push(res.data.body[i].categoryName)
          }
          that.setData({
            section: sectionarr
          })
          that.items2(seach)
        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }

      }
    });
  },
  xm_model: function (e) {
    var that = this
    var start = e.currentTarget.dataset
    wx.navigateTo({
      url: '../xm_model/xm_model?ids=' + start.ids + '&data1=' + that.data.date1 + '&data2=' + that.data.date2,
    })
  },






  // 业务员
  salesman: function (seach) {
    var that = this
    wx.showLoading({
      title: '正在加载...',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getSellStaticEmployee.ashx',
      data: {
        openID: opends,
        pageSize: that.data.pagesi,
        pageIndex: that.data.pagein,
        startDate: that.data.date1,
        endDate: that.data.date2,
      },
      success: function (res) {
        // console.log(res)
        setTimeout(function () {
          wx.hideLoading()
        }, 1500)
        if (res.data.head.status == 'success') {
          if (res.data.body == '') {
            if (seach == 'seach') {
              that.setData({
                noens: true,
                items4: newarr,
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
              items3: newarr,
            })
          }
        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }

      }
    });

  },





  // 区域获取省份
  eachwrap: function () {
    var that = this
    wx.showLoading({
      title: '正在加载...',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getProvinceList.ashx',
      data: {
        openID: opends,
      },
      success: function (res) {
        setTimeout(function () {
          wx.hideLoading()
        }, 1500)
        if (res.data.head.status == 'success') {
          var eacharr = []
          for (var i = 0; i < res.data.body.length; i++) {
            eacharr.push(res.data.body[i].province)
          }
          that.setData({
            eachwraps: eacharr
          })

          that.areaseach('seach')
        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }

      }
    });
  },
  // 区域获取部门
  busection: function () {
    var that = this
    wx.showLoading({
      title: '正在加载...',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getDeptList.ashx',
      data: {
        openID: opends,
      },
      success: function (res) {
        // console.log(res)
        var sectionarr = []
        var ids = [];
        if (res.data.head.status == 'success') {
          for (var i = 0; i < res.data.body.length; i++) {
            sectionarr.push(res.data.body[i].deptName)
            ids.push(res.data.body[i].id)
          }
          that.setData({
            busection: sectionarr,
            idsval: ids
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
  // 选择省份
  eachwraps: function (e) {
    var that = this
    that.setData({
      eachwrapsval: that.data.eachwraps[e.detail.value]
    })
  },
  // 选择部门
  busectionclick: function (e) {
    var that = this
    that.setData({
      busectionval: that.data.busection[e.detail.value],
      idsvall: that.data.idsval[e.detail.value]
    })
  },
  // 点击搜索
  seacheach: function () {
    var that = this
    newarr = []
    that.areaseach('seach')
  },
  // 区域
  areaseach: function (seach) {
    var that = this
    wx.showLoading({
      title: '正在加载...',
      mask: true
    })
    // console.log(that.data.eachwrapsval)
    // console.log(that.data.idsvall)
    // console.log(that.data.date1)
    // console.log(that.data.date2)
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getSellStaticRegion.ashx',
      data: {
        openID: opends,
        province: that.data.eachwrapsval,
        deptID: that.data.idsvall,
        startDate: that.data.date1,
        endDate: that.data.date2,
      },
      success: function (res) {
        setTimeout(function () {
          wx.hideLoading()
        }, 1500)
        if (res.data.head.status == 'success') {

          if (res.data.body == '') {
            if (seach == 'seach') {
              that.setData({
                noens: true,
                items4: newarr,
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
              items4: newarr,
            })
          }

        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }

      }
    });
  },

  // 左侧导航切换
  navclick: function (e) {
    var that = this
    newarr = []
    that.setData({
      leftnav: e.currentTarget.dataset.navs,
      pagesi: 10,
      pagein: 1
    })
    if (e.currentTarget.dataset.navs == 0) {
      that.fun_date(0)
      that.section('seach')
      that.setData({
        xiaoshou: true,
        kehu: false,
        jingying: false,
      })
    } else if (e.currentTarget.dataset.navs == 1) {
      that.fun_date(-30)
      that.getCustomerActiveness('seach')
      that.setData({
        xiaoshou: false,
        kehu: true,
        jingying: false,
      })

    } else {
      that.setData({
        xiaoshou: false,
        kehu: false,
        jingying: true,
      })
    }

  },
  // 客户活跃度日期切换
  stylestime: function (e) {
    var that = this
    newarr = []
    that.setData({
      stylestime: e.currentTarget.dataset.stylestime,
      pagesi: 10,
      pagein: 1
    })
    if (e.currentTarget.dataset.stylestime == 0) {
      that.fun_date(-30)
    } else if (e.currentTarget.dataset.stylestime == 1) {
      that.fun_date(-90)
    } else if (e.currentTarget.dataset.stylestime == 2) {
      that.fun_date(-180)
    } else if (e.currentTarget.dataset.stylestime == 3) {
      that.fun_date(-360)
    }
    that.getCustomerActiveness('seach')
  },

  // 搜索输入
  kehuphonedInput: function (e) {
    var that = this
    this.setData({
      kehuseach: e.detail.value
    })
  },
  // 搜索
  kehuseachs: function () {
    var that = this
    newarr = []
    that.setData({
      pagesi: 10,
      pagein: 1
    })
    that.getCustomerActiveness('seach')
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
    // console.log(num)
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
    // console.log(num.split("")[0])
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
        DaysStart: 91,
        Daysend: 365
      })

    } else if (indexs == 2) {
      that.setData({
        DaysStart: 31,
        Daysend: 90
      })

    } else if (indexs == 3) {
      that.setData({
        DaysStart: 11,
        Daysend: 30
      })

    } else if (indexs == 4) {
      that.setData({
        DaysStart: 4,
        Daysend: 10
      })
    } else if (indexs == 5) {
      that.setData({
        DaysStart: 0,
        Daysend: 3
      })
    }
    that.getCustomerActiveness('seach')
  },
  getCustomerActiveness: function (seach) {
    var that = this
    // console.log(that.data.kehuseach)
    // console.log(that.data.pagein)
    // console.log(that.data.date1)
    // console.log(that.data.date2)
    // console.log(that.data.DaysStart)
    // console.log(that.data.Daysend)
    // console.log(that.data.Start)
    // console.log(that.data.ends)
    wx.showLoading({
      title: '正在加载...',
      mask: true
    })
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getCustomerActiveness.ashx',
      data: {
        openID: opends,
        CGUnitName: that.data.kehuseach,
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
        setTimeout(function () {
          wx.hideLoading()
        }, 1500)
        if (res.data.head.status == 'success') {
          if (res.data.body == '') {
            if (seach == 'seach') {
              that.setData({
                noens: true,
                items1: newarr,
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
              } else {
                res.data.body[i].XSGXDs = 0
              }
              if (b >= 0 && b <= 3) {
                res.data.body[i].nolDays = 5
              } else if (b >= 4 && b <= 10) {
                res.data.body[i].nolDays = 4
              } else if (b >= 11 && b <= 30) {
                res.data.body[i].nolDays = 3
              } else if (b >= 31 && b <= 90) {
                res.data.body[i].nolDays = 2
              } else if (b >= 91 && b <= 365) {
                res.data.body[i].nolDays = 1
              } else {
                res.data.body[i].nolDays = 0
              }
              newarr.push(res.data.body[i])
            }
            that.setData({
              noens: false,
              items1: newarr,
            })
          }

        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }
        // console.log(res.data.body)
      }
    });
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
  // 活跃度详情跳转
  hm_liven: function (e) {
    var that = this
    var start = e.currentTarget.dataset
    wx.navigateTo({
      url: '../hm_liveness/hm_liveness?address=' + start.address + '&avgmoney=' + start.avgmoney + '&cgunitname=' + start.cgunitname + '&countnum=' + start.countnum + '&id=' + start.id + '&lastdate=' + start.lastdate + '&mobilephone=' + start.mobilephone + '&noselldays=' + start.noselldays + '&summoney=' + start.summoney + '&data1=' + that.data.date1 + '&data2=' + that.data.date2,
    })
  },
  kehusearchScrollLower: function () {
    var that = this
    that.data.pagein++
    that.getCustomerActiveness()
  },




  // 经营概况
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
            allcategory: res.data.body[0].totalDueMoney,
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
        // console.log(res)
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
        // console.log(res)
        // console.log(that.data.yesdate2)
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
        if (res.data.head.status == 'success') {
          that.setData({
            allqitongthreesellCounts: res.data.body[0].sellCount,
            allqitongthreeltotalMoney: res.data.body[0].totalMoney,
            allqitongthreetotalProfits: res.data.body[0].totalProfits,
            shouru: Math.round((res.data.body[0].totalMoney - res.data.body[0].totalProfits) * 100) / 100
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
        ajaallday1: time1,
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
    that.ajaallday('seach')
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
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          heights: res.windowHeight

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