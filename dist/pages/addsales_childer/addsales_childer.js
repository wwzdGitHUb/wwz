// pages/addsales_childer/addsales_childer.js
var AjaxUrl = require('../../utils/util.js');
var Util = require('../../app.js')
var opends;
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    bzgoods: 0,
    morebz: '',
    pbaddress: '',
    ywyclick: 0,
    ysymoney: 0,
    yfclick: 0,
    qtmoney: 0,
    ysmoney: 0,
    bcmoney: 0,
    biaoshi: 0,
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
    that.oneconfirmbutt()


    that.ckgoods()
    that.skmoney()
    that.yewu()
    // 获取打印
    var dy = wx.getStorageSync('fsdy')
    that.setData({
      fsdy: dy
    })
    wx.removeStorageSync('messa')
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
    that.setData({
      khids: names[0],
      biaoshi: 0
    })
    if (!namekhs == '') {
      that.setData({
        namekh: names[1]
      })
    }

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
  // 设置
  shezhi: function (e) {
    var that = this
    // console.log(e.currentTarget.dataset)
    that.setData({
      hiddemsg: true,
      names: e.currentTarget.dataset.names,
      indexs: e.currentTarget.dataset.indexs,
      allnums: e.currentTarget.dataset.countms,
      allmonesa: ''
    })
    // that.data.codeslist[e.currentTarget.dataset.indexs].price=
  },
  // d单价
  pricenum: function (e) {
    var that = this;
    that.setData({
      pricenum: e.detail.value,
    })
    var smoey = Number(that.data.allnums) * Number(e.detail.value)
    // console.log(smoey)
    if (typeof (smoey) == NaN) {
      that.setData({
        allmonesa: '单价和数量请输入正确数字'
      })
    } else {
      that.setData({
        allmonesa: smoey.toFixed(2)
      })

    }

  },
  // 金额


  // 备注
  bzgoods: function (e) {
    var that = this;
    that.setData({
      bzgoods: e.detail.value
    })
  },
  // 保存
  succw: function (e) {
    var that = this;
    if (that.data.pricenum == '') {
      wx.showToast({
        title: '请输入单价！',
        icon: 'none'
      })
    } else {
      that.data.codeslist[that.data.indexs].price = that.data.pricenum
      that.data.codeslist[that.data.indexs].smallMoney = Math.floor((Number(that.data.pricenum) * Number(that.data.allnums)) * 100) / 100
      that.data.codeslist[that.data.indexs].memoInfo = that.data.bzgoods
      that.setData({
        codeslist: that.data.codeslist,
        hiddemsg: false,
      })
    }

    var allsmall = []
    var sumall = 0
    for (var i = 0; i < that.data.codeslist.length; i++) {
      if (that.data.codeslist.smallMoney == NaN) {
        that.data.codeslist[i].smallMoney = 0
      }
      allsmall.push(that.data.codeslist[i].smallMoney)
      sumall += Number(allsmall[i])
    }
    that.setData({
      sumalls: sumall
    })
    that.allpricemoney()
  },
  quxiao: function () {
    var that = this
    that.setData({
      hiddemsg: false,
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
    if (that.data.sumalls == undefined) {
      wx.showToast({
        title: '请完善累计表单信息！',
        icon: 'none'
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
  // 应收金额
  // ysmoney: function (e) {
  //   var that = this
  //   that.setData({
  //     ysmoneys: e.detail.value
  //   })
  // },
  // 应收余额
  // ysymoney: function () {
  //   var that = this;
  //   that.setData({
  //     ysymoney: e.detail.value
  //   })
  // },
  // 本次收款
  bcmoney: function (e) {
    var that = this
    if (that.data.ysmoneys == undefined) {
      wx.showToast({
        title: '请完善累计表单信息！',
        icon: 'none'
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
  oneconfirmbutt: function (e) {
    var that = this
    var codesmd = wx.getStorageSync('codesmd')
    // that.setData({
    //   codeslist: codesmd,
    // })
    var a = []
    // console.log(that.data.codeslist)
    var arr = codesmd
    var maps = {},
      dests = [];

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].isCut == 2) {
        arr[i].idList = arr[i].id
        arr[i].meterList = arr[i].meter
        arr[i].productBMList = arr[i].productBM
        arr[i].cutMemoList = arr[i].cutMemoInfo
        arr[i].countM = arr[i].meterList
        arr[i].countP = 1
        dests.push(arr[i])
        maps.iscuts = dests
      } else {
        a.push(arr[i])
        maps.noiscuts = a
      }
    }
    var arr2 = maps.noiscuts

    var map = {},
      dest = [];
    if (maps.noiscuts != undefined) {
      for (var i = 0; i < arr2.length; i++) {
        var ai = arr2[i];
        if (!map[ai.productID]) {
          dest.push({
            productID: ai.productID,
            data: [ai]
          });
          map[ai.productID] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.productID == ai.productID) {
              dj.data.push(ai);
              break;
            }
          }
        }
      }
    }
    // console.log(dest);
    var allnuerr = []
    var idLists = []
    var meterLists = []
    var productBMLists = []
    var cutMemoLists = []
    var countPs = []
    if (maps.iscuts != undefined) {
      for (var i = 0; i < maps.iscuts.length; i++) {
        allnuerr.push(maps.iscuts[i])
      }
    }
    for (var i = 0; i < dest.length; i++) {
      if (dest[i].data.length > 1) {
        for (var j = 0; j < dest[i].data.length; j++) {
          idLists.push(dest[i].data[j].id)
          dest[i].data[0].idList = idLists.join(',')
          dest[i].data[0].cutMemoList = cutMemoLists.join(',')

          console.log(dest[i].data.length)
          countPs.push(dest[i].data.length)
          dest[i].data[0].countP = countPs[i]
          // dest[i].data[0].smallMoney = cutMemoLists.join(',')
          meterLists.push(dest[i].data[j].meter)
          if (dest[i].data[j].meter == '') {
            dest[i].data[0].meterList = dest[i].data[j].meter
            dest[i].data[0].countM = meter
          } else {
            dest[i].data[0].meterList = meterLists.join(',')
            var addcountM = 0
            for (var n = 0; n < meterLists.length; n++) {
              addcountM += Number(meterLists[n])
            }
            dest[i].data[0].countM = addcountM
          }

          productBMLists.push(dest[i].data[j].productBM)
          if (dest[i].data[j].productBM == '') {
            dest[i].data[0].productBMList = dest[i].data[j].productBM
          } else {
            dest[i].data[0].productBMList = productBMLists.join(',')
          }
          cutMemoLists.push(dest[i].data[j].cutMemoInfo)
          if (dest[i].data[j].cutMemoInfo == '') {
            dest[i].data[0].cutMemoList = dest[i].data[j].cutMemoInfo
          } else {
            dest[i].data[0].cutMemoList = cutMemoLists.join(',')
          }


        }
      } else {
        dest[i].data[0].idList = dest[i].data[0].id
        dest[i].data[0].meterList = dest[i].data[0].meter
        dest[i].data[0].productBMList = dest[i].data[0].productBM
        dest[i].data[0].cutMemoList = dest[i].data[0].cutMemoInfo
        dest[i].data[0].countM = dest[i].data[0].meterList
        dest[i].data[0].countP = 1
      }
      allnuerr.push(dest[i].data[0])
    }
    console.log(allnuerr);
    that.setData({
      codeslist: allnuerr,
    })
    that.allpricemoney()

  },

  // 提交订单
  confirmbutt: function () {
    var that = this

    var arrs = []
    var lists = new Array
    lists = that.data.codeslist
    for (var i = 0; i < lists.length; i++) {
      if (lists[i].isCut == 2) {
        lists[i].cutNum = 1
      } else {
        lists[i].cutNum = 0
      }
      delete (lists[i]["CGUnitName"]);
      delete (lists[i]["chaecktruefalse"]);
      delete (lists[i]["checkEmpID"]);
      delete (lists[i]["doorWidth"]);
      delete (lists[i]["employeeID"]);
      delete (lists[i]["fabricClass"]);
      delete (lists[i]["iMatchedID"]);
      delete (lists[i]["iconUrl"]);
      delete (lists[i]["id"]);
      delete (lists[i]["inDate"]);
      delete (lists[i]["isLock"]);
      delete (lists[i]["isSold"]);
      delete (lists[i]["meter"]);
      delete (lists[i]["orderBillNumber"]);
      delete (lists[i]["pProductBM"]);
      delete (lists[i]["pid"]);
      delete (lists[i]["productBM"]);
      delete (lists[i]["productGH"]);
      delete (lists[i]["rowIndex"]);
      delete (lists[i]["scanCheckEmpID"]);
      delete (lists[i]["specID"]);
      delete (lists[i]["specName"]);
      delete (lists[i]["storePositionID"]);
      delete (lists[i]["storePositionName"]);
      delete (lists[i]["storehouseID"]);
      delete (lists[i]["storehouseName"]);
      delete (lists[i]["unit"]);
      delete (lists[i]["userID"]);
      delete (lists[i]["userName"]);
      delete (lists[i]["userName"]);
      delete (lists[i]["userName"]);
      delete (lists[i]["userName"]);
      delete (lists[i]["cutMemoInfo"]);
      delete (lists[i]["isCut"]);
      delete (lists[i]["billNumber"]);
      // console.log(lists[i].price)
      if (lists[i].price == undefined || lists[i].countM == undefined) {
        wx.showToast({
          title: '请输入完整表单信息!',
          icon: 'none'
        })
        return false;
      }

    }
    console.log(lists)

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
        if (res.cancel) {

        } else {
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
          // console.log(that.data.sumalls + '~~~明细项金额累计')

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
            totalSmallMoney: that.data.sumalls,//明细项金额累计
          }
          var MainData = JSON.stringify(min);
          var li = JSON.stringify(lists)
          wx.request({
            url: AjaxUrl.AjaxUrl + 'SellBillNew.ashx',
            // SellBillNew.ashx
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            data: Util.json2Form({
              MainData,
              DetailData: li
            }),
            success: function (res) {
              wx.hideLoading()
              // console.log(res)
              // 缓存打印
              wx.setStorageSync('fsdy', that.data.fsdy)
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


  allpricemoney: function () {
    var that = this
    var p = [],
      s = [],
      price = [];
    var allp = 0
    var all_s = 0
    var allprice = 0
    var alls = that.data.codeslist
    for (var i = 0; i < alls.length; i++) {
      p.push(alls[i].countP)
      s.push(alls[i].countM)
      if (!alls[i].smallMoney) {
        alls[i].smallMoney = 0
      }
      price.push(alls[i].smallMoney)
      allp += Number(p[i])
      all_s += Number(s[i])
      allprice += Number(price[i])
    }

    var yingshou = (Math.floor((Number(allprice) + Number(that.data.yfclick) + Number(that.data.qtmoney)) * 100) / 100).toFixed()

    that.setData({
      p_num: (Math.floor(allp * 100) / 100),
      s_num: (Math.floor(all_s * 100) / 100),
      j_price: (Math.floor(allprice * 100) / 100).toFixed(1),
      ysmoneys: yingshou,

    })
    // if (that.data.bcmoney==0){
    //   that.setData({
    //     ysymoney: yingshou
    //   })
    // }

    var yuer = Number(that.data.ysmoneys) - Number(that.data.bcmoney)
    that.setData({
      ysymoney: yuer
    })
  },


  /**totalSmallMoney + freightFee（运费）+otherMoney（其他金额） = actualMoney
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