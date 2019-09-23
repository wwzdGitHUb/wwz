// pages/addsales_childer_tow/addsales_childer_tow.js
var AjaxUrl = require('../../utils/util.js');
var Util = require('../../app.js')
var opends;
var addtow = []
var alllisttow = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeslist: [],
    hiddemsg: false,
    focus: false,
    hiddemsgtow: false,
    stopclick:true,
    indexlist: 0,
    bzgoods: '',
    pricenum: 0,
    allnums: 0,
    numtow: '',
    date1: 'xxxx-xx-xx',
    waymoney: ['现金', '银行转账'],
    waymoneyval: '现金',
    hiddemsg: false,
    zjmoney: 0,
    newids: 1,
    khids: '',
    numgoods: '',
    pricenum: '',
    moneys: '',
    morebz: '',
    pbaddress: '',
    ywyclick: 0,
    ysymoney: 0,
    yfclick: 0,
    qtmoney: 0,
    ysmoney: 0,
    bcmoney: 0,
    biaoshi: 0,
    p_num: 0,
    s_num: 0,
    j_price: 0,
    ysmoneys: 0,
    g_pnum:0,
    g_nun:0,
    fsdy: ''
  },
  waymoney: function (e) {
    this.setData({
      waymoneyval: this.data.waymoney[e.detail.value]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    opends = wx.getStorageSync('BL_openid')
    var date1 = new Date(),
      time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();//time1表示当前时间
    var ti1 = time1.split("-")
    var a1 = []
    a1.push(ti1[0])
    a1.push(ti1[1] < 10 ? '0' + ti1[1] : ti1[1])
    a1.push(ti1[2] < 10 ? '0' + ti1[2] : ti1[2])
    var time1 = a1.join('-')
    that.setData({
      date1: time1
    })
    that.ckgoods()
    that.skmoney()
    that.yewu()
  },
  bindDateChange: function (e) {
    var that = this
    that.setData({
      date1: e.detail.value
    })
  },
  // 客户跳转
  clients: function () {
    wx.navigateTo({
      url: '../kehu/kehu?addsal=' + 'blocknone',
    })
  },
  ckgoods: function () {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getStorehouseList.ashx',
      data: {
        openID: opends,
      },
      success: function (res) {
        // console.log(res)
        var newarr = []
        var newid = []
        for (var i = 1; i < res.data.body.length; i++) {
          newarr.push(res.data.body[i].storehouseName)
          newid.push(res.data.body[i].id)
        }
        that.setData({
          category: newarr,
          newid: newid,
          ckgoodsval: newarr[0]
        })
      }
    });

  },
  // 收款账号获取
  skmoney: function () {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getAccountList.ashx',
      data: {
        openID: opends,
      },
      success: function (res) {
        // console.log(res)
        var newarr = []
        var skzhnewids = []
        for (var i = 1; i < res.data.body.length; i++) {
          newarr.push(res.data.body[i].accountName)
          skzhnewids.push(res.data.body[i].id)
        }
        that.setData({
          skmoney: newarr,
          skmoneyvalid: skzhnewids,
          skmoneyval: newarr[0],
          skid: skzhnewids[0]
        })
      }
    });
  },
  // 业务员
  yewu: function () {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getEmployeeList.ashx',
      data: {
        openID: opends,
      },
      success: function (res) {
        // console.log(res)
        var newarr = []
        var yewunewid = []
        for (var i = 1; i < res.data.body.length; i++) {
          newarr.push(res.data.body[i].employeeName)
          yewunewid.push(res.data.body[i].id)
        }
        that.setData({
          yewu: newarr,
          yewuskmoneyval: newarr[0],
          yewuid: yewunewid[0],
          yewunewid: yewunewid
        })
      }
    });
  },
  yewuchanges: function (e) {
    var that = this
    this.setData({
      yewuskmoneyval: this.data.yewu[e.detail.value],
      yewuid: this.data.yewunewid[e.detail.value],
    })
    // console.log(this.data.yewunewid[e.detail.value])
  },
  // 主仓库
  changes: function (e) {
    this.setData({
      ckgoodsval: this.data.category[e.detail.value],
      newids: this.data.newid[e.detail.value],
    })
    // console.log(this.data.newid[e.detail.value])
  },
  skmoneychage: function (e) {
    this.setData({
      skmoneyval: this.data.skmoney[e.detail.value],
      skid: this.data.skmoneyvalid[e.detail.value],
    })
  },
  // 备注
  bzgoods: function (e) {
    var that = this;
    that.setData({
      bzgoods: e.detail.value
    })
  },
  // 备注
  morebz: function (e) {
    var that = this
    that.setData({
      morebz: e.detail.value
    })
  },
  // 拼包地址
  pbaddress: function (e) {
    var that = this
    that.setData({
      pbaddress: e.detail.value
    })
  },
  // 运费
  yfclick: function (e) {
    var that = this
    that.setData({
      yfclick: e.detail.value,
    })
    that.allpricemoney()
  },
  // 其他金额
  qtmoney: function (e) {
    var that = this
    var re = /^[+-]?\d*\.?\d{0,3}$/;
    if (that.data.j_price == undefined || that.data.j_price == 0) {
      wx.showToast({
        title: '请完善累计表单信息！',
        icon: 'none',
        mask: true
      })
    } else {
      if (!re.test(e.detail.value)) {
        wx.showToast({
          title: '请输入数字！',
          icon: 'none',
          duration: 1000,
          success: function () {
            that.setData({
              qtmoney: 0,
            })
          }
        })
      } else {
        that.setData({
          qtmoney: e.detail.value,
        })
        that.allpricemoney()
      }
    }

  },
  // 本次收款
  bcmoney: function (e) {
    var that = this
    if (that.data.ysmoneys == undefined) {
      wx.showToast({
        title: '请完善累计表单信息！',
        icon: 'none',
        mask: true
      })
    } else {
      that.setData({
        bcmoney: e.detail.value,
      })
    }
    that.allpricemoney()
  },
  // 发送打印
  fsdy: function (e) {
    var that = this
    that.setData({
      fsdy: e.detail.value
    })
  },
  allpricemoney: function () {
    var that = this
    var p = [],
      s = [],
      price = [];
    var allp = 0
    var all_s = 0
    var allprice = 0
    var alls = that.data.codeslist
    // console.log(alls)
   
    for (var i = 0; i < alls.length; i++) {
      p.push(alls[i].all_numchilder)
      s.push(alls[i].countM)
      if (!alls[i].smallMoney) {
        alls[i].smallMoney = 0
      }
      price.push(alls[i].smallMoney)
      all_s += Number(s[i])
      allprice += Number(price[i])
    }
    var pwrap=[]
    for(var i=0;i<p.length;i++){
      pwrap.push(p[i])
    }
    pwrap.join(',')
    var yingshou = (Math.floor((Number(allprice) + Number(that.data.yfclick) + Number(that.data.qtmoney)) * 100) / 100).toFixed()
    // console.log(pwrap)
    var allpw=[]
    for (var j = 0; j < pwrap.length;j++){
      for (var h = 0; h < pwrap[j].length;h++){
        allpw.push(pwrap[j][h])
      }
    }
    if (alls.length == 0) {
      that.setData({
        p_num:0,
        s_num:0,
        j_price:0,
        ysmoneys: 0,
      })
      that.setData({
        ysymoney: 0
      })
    } else {
      that.setData({
        p_num: allpw.length,
        s_num: (Math.floor(all_s * 100) / 100),
        j_price: (Math.floor(allprice * 100) / 100).toFixed(1),
        ysmoneys: yingshou,
      })
      var yuer = Number(that.data.ysmoneys) - Number(that.data.bcmoney)
      that.setData({
        ysymoney: yuer
      })
    }
    
  },



  // 弹窗1
  shezhi: function (e) {
    var that = this
    // e.currentTarget.dataset.indes
    // console.log(e.currentTarget.dataset)
    
   
    if (that.data.namekh == undefined) {
      wx.showToast({
        title: '请选择客户！',
        icon: 'none'
      })
      return false
    }
    // console.log(e.currentTarget.dataset.g_num)
    that.setData({
      hiddemsg: true,
      indexlist: e.currentTarget.dataset.indexs,
      names: e.currentTarget.dataset.names,
      allnums: e.currentTarget.dataset.countms,
      pricenum: e.currentTarget.dataset.price,
      allmonesa: e.currentTarget.dataset.smallmoney,
      numtowlist: e.currentTarget.dataset.all_numchilder,
      bzgoods: e.currentTarget.dataset.bz,
      namesid: e.currentTarget.dataset.namesid
    })
  },
  pricenumfocus:function(){
    var that = this
    if (that.data.pricenum==0){
      that.setData({
        pricenum: ''
      })
    }
  },
  quxiao: function () {
    var that = this
    that.setData({
      hiddemsg: false,
      allnums: 0,
      pricenum: 0,
      allmonesa: 0,
      bzgoods: '',
      numtow: '',

    })
  },
  // 弹窗2
  layertow: function () {
    var that = this
    that.setData({
      hiddemsgtow: true,
      focus: true,
      numtow:''
    })
  },
  quxiaotow: function () {
    var that = this
    that.setData({
      hiddemsgtow: false,
    })
  },
  // 第二个弹窗数量
  numtow: function (e) {
    var that = this
    that.setData({
      numtow: e.detail.value,

    })
  },
  // 点击添加
  addtownum: function (e) {
    var that = this
    if (that.data.numtow == '') {
      wx.showToast({
        title: '请输入数量！',
        icon: 'none',
        mask:true
      })
      that.setData({
        focus: true
      })
      return false
    }
    var newarr=[]
    newarr = that.data.codeslist[that.data.indexlist].all_numchilder
    // console.log(that.data.numtow)
    newarr.push(that.data.numtow)
    that.data.codeslist[that.data.indexlist].all_numchilder = newarr
    that.setData({
      numtowlist: newarr,
      numtow: '',
      focus: true
    })
    that.jtow()
  },
  // 删除明细项列表中的某一项
  removetowlist: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success: function (res) {
        if (res.confirm) {
          var codeslisttow = that.data.codeslist
          codeslisttow.splice(e.currentTarget.dataset.indes, 1)
          that.setData({
            codeslist: codeslisttow
          })
          that.mxljlist()
        }
      }
    })
  },
  add: function () {
    wx.navigateTo({
      url: '../addsales_list_tow/addsales_list_tow',
    })
  },
  // 点击弹窗上某个关闭
  closetowlist: function (e) {
    var that = this
    that.data.numtowlist.splice(e.currentTarget.dataset.indes, 1)
    that.setData({
      numtowlist: that.data.numtowlist,
      focus: false,
    })
    that.data.codeslist[that.data.indexlist].all_numchilder = that.data.numtowlist
    // console.log(that.data.numtowlist)
    // console.log(that.data.codeslist[that.data.indexlist].all_numchilder)
  },
  // 第二个弹窗确定按钮
  succtowlist: function (e) {
    var that = this
    if (that.data.numtowlist == '') {
      wx.showToast({
        title: '请添加数量！',
        icon: 'none'
      })
      return false
    } else {
      var allnumlisttow = 0
      for (var i = 0; i < that.data.numtowlist.length; i++) {
        allnumlisttow += Number(that.data.numtowlist[i])
      }
      that.setData({
        hiddemsgtow: false,
        allnums: Math.round(allnumlisttow*100)/100 ,
        focus: false,

      })
      that.jtow()
    }

  },
  // 单价
  pricenum: function (e) {
    var that = this
    that.setData({
      pricenum: e.detail.value
    })
    that.jtow()
  },

  // 计算金额
  jtow: function () {
    var that = this
    var jtow = 0
    jtow = Math.floor(Number(that.data.pricenum) * Number(that.data.allnums)*100)/100 
    that.setData({
      allmonesa: jtow,
    })

  },
  // 确定按钮
  succwone: function () {
    var that = this
    addtow=[]
    if (that.data.allnums == 0 || that.data.allnums == '') {
      wx.showToast({
        title: '请输入数量！',
        icon: 'none'
      })
      return false;
    }
    if (that.data.pricenum == 0 || that.data.pricenum == '') {
      wx.showToast({
        title: '请输入单价！',
        icon: 'none'
      })
      return false;
    }
    var obj = that.data.codeslist
    // console.log(obj)
    // console.log(that.data.indexlist)
    obj[that.data.indexlist].price = that.data.pricenum
    obj[that.data.indexlist].countM = that.data.allnums
    obj[that.data.indexlist].smallMoney = that.data.allmonesa
    obj[that.data.indexlist].memoInfo = that.data.bzgoods
    obj[that.data.indexlist].meterList = obj[that.data.indexlist].all_numchilder.join(',')
    obj[that.data.indexlist].cutNum = that.data.numtowlist.length
    obj[that.data.indexlist].countP = obj[that.data.indexlist].all_numchilder.length
    that.setData({
      codeslist: obj,
      hiddemsg: false
    })
    that.mxljlist()
  },
  // 累计项
  mxljlist: function () {
    var that = this
    var l_sun = 0,
      l_jmoy = 0;
    // console.log(that.data.codeslist)
    for (var i = 0; i < that.data.codeslist.length; i++) {
      l_sun += Number(that.data.codeslist[i].countM)
      l_jmoy += Number(that.data.codeslist[i].smallMoney)
    }
    if (that.data.codeslist.length==0){
      that.setData({
        p_num:0,
        s_num: 0,
        j_price: 0
      })
    }else{
      that.setData({
        p_num: that.data.codeslist.length,
        s_num: l_sun,
        j_price: l_jmoy
      })
    }
    that.allpricemoney()
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
    var namekhs = wx.getStorageSync('messa')
    var names = namekhs.split('&')
    var listtow = wx.getStorageSync('listtow')
    var dy = wx.getStorageSync('fsdytow')
    that.setData({
      khids: names[0],
      biaoshi: 0,
      fsdy: dy
    })
    if (!namekhs == '') {
      that.setData({
        namekh: names[1]
      })
    }

    var listtows = wx.getStorageSync('number')
    if (listtow == -1) {
      for (var i = 0; i < listtows.length; i++) {
        alllisttow.push(listtows[i])
        listtows[i].price = 0
        listtows[i].countP = 0
        listtows[i].countM = 0
        listtows[i].smallMoney = 0
        listtows[i].memoInfo = ''
        listtows[i].meterList = 0
        listtows[i].cutNum = 0
        listtows[i].all_numchilder = []
        listtows[i].productID = listtows[i].id
      }

    }
    wx.removeStorageSync('listtow')
    // console.log(listtows)
    that.setData({
      codeslist: alllisttow
    })

    // console.log(that.data.codeslist)
  },
  // 提交订单
  confirmbutt: function () {
    var that = this
    var arrs = []
    var lists = new Array
    lists = that.data.codeslist
    // console.log(lists)

    
    if (lists.length == 0) {
      wx.showToast({
        title: '请先创建销售单!',
        icon: 'none'
      })
      return false;
    }
    for (var i = 0; i < lists.length; i++) {
      if (lists[i].price == 0 || lists[i].countM == 0) {
        wx.showToast({
          title: '请输入完整表单信息!',
          icon: 'none'
        })
        return false;
      }

    }
    // console.log(lists)
    if (that.data.yfclick == undefined || that.data.ysmoneys == undefined || that.data.bcmoney == undefined) {
      wx.showToast({
        title: '请输入运费、其他、本次收款金额！',
        icon: 'none'
      })
      return false;
    }
    if (that.data.namekh == undefined) {
      wx.showToast({
        title: '请选择客户！',
        icon: 'none'
      })
      return false
    }
    wx.showModal({
      title: '提示',
      content: '确认提交？',
      success: function (res) {
        if (!res.cancel) {
          wx.showLoading({
            title: '正在提交...',
            mask: true
          })
          // console.log(that.data.date1 + '~~~日期')
          // console.log(that.data.khids + '~~~客户id')
          // console.log(that.data.pbaddress + '~~~拼包地址')
          // console.log(that.data.yewuid + '~~~业务员id')
          // console.log(that.data.yfclick + '~~~运费金额')
          // console.log(that.data.qtmoney + '~~~其他金额')
          // console.log(that.data.ysmoneys + '~~~应收金额')
          // console.log(that.data.ysymoney + '~~~应收余额')
          // console.log(that.data.waymoneyval + '~~~收款方式')
          // console.log(that.data.skid + '~~~收款账户')
          // console.log(that.data.ckgoodsval + '~~~仓库')
          // console.log(that.data.bcmoney + '~~~本次收款')
          // console.log(that.data.newids + '~~~仓库id')
          // console.log(that.data.j_price + '~~~明细项金额累计')

          // console.log(lists)
          var min = {
            openID: opends,
            startDate: that.data.date1,
            CGUnitID: that.data.khids,
            memoInfo: that.data.morebz,
            PBAddress: that.data.pbaddress,
            employeeID: that.data.yewuid,
            freightFee: that.data.yfclick,
            otherMoney: that.data.qtmoney,
            actualMoney: that.data.ysmoneys,//应收金额
            dueMoney: that.data.ysymoney,
            moneyType: that.data.waymoneyval,
            accountID: that.data.skid,
            sendPrint: that.data.fsdy,
            receivedMoney: that.data.bcmoney, //本次收款
            storehouseID: that.data.newids,
            totalSmallMoney: that.data.j_price,//明细项金额累计
          }
          var mainData = JSON.stringify(min);
          var li = JSON.stringify(lists)
          wx.request({
            url: AjaxUrl.AjaxUrl + 'SellBillNewFast.ashx',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            data: Util.json2Form({
              MainData: mainData,
              DetailData: li
            }),
            success: function (res) {
              wx.hideLoading()
              // console.log(res)
              // 清除缓存列表
              wx.getStorageSync
              wx.removeStorageSync('number')
              wx.removeStorageSync('messa')
              alllisttow=[]
              // 缓存打印
              wx.setStorageSync('fsdytow', that.data.fsdy)
              wx.showToast({
                title: res.data.head.msg,
                icon: 'none',
                duration: 2000,
                success: function () {
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 2000)
                }
              })
            }
          });
        }

      }
    })

  },



  // 获取上次价格
  lastprice: function () {
    var that = this
    if (that.data.stopclick == true) {
      wx.showLoading({
        title: '正在获取...',
        mask: true,
      })
      if (that.data.khids == undefined || that.data.khids == '') {
        wx.showToast({
          title: '请先选择客户！',
          icon: 'none'
        })
        return false;
      }
      // console.log(that.data.namesid+'-----产品编号id')
      // console.log(that.data.khids + '-----客户id')
      wx.request({
        url: AjaxUrl.AjaxUrl + 'getOnePrice.ashx',
        data: {
          openID: opends,
          productID: that.data.namesid,
          CGUnitID: that.data.khids,
        },
        success: function (res) {
          // console.log(res)
          wx.hideLoading()
          that.setData({
            stopclick: false
          })
          setTimeout(function () {
            that.setData({
              stopclick: true
            })
          }, 3000)
          if (res.data.body != '') {
            that.setData({
              pricenum: res.data.body[0].price,
            })
            var smoey = Number(that.data.allnums) * Number(that.data.pricenum)
            that.setData({
              allmonesa: smoey.toFixed(2)
            })
          } else {
            wx.showToast({
              title: '上次暂未设置价格！',
              icon: 'none'
            })
          }

        }
      });
    } else {
      wx.showToast({
        title: '请稍后再试！',
        icon: 'none'
      })
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