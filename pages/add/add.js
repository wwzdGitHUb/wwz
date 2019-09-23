// pages/add/add.js
var list = []
var app = getApp()
var AjaxUrl = require('../../utils/util.js');
var crtys = require('../../app.js');
var opends;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    eachwraps1: '默认部门',
    moremsg: false,
    eachwraps3: ['批发商', '零售商'],
    inputs1: '',
    inputs2: '',
    inputs3: '',
    inputs4: '',
    inputs5: '',
    inputs6: '',
    inputs7: '',
    inputs8: '',
    inputs9: '',
    inputs10: '',
    inputs11: '',
    eachwrapsval4: '',
    eachwrapsval5: '',
    multiIndex: [0, 0],
    multiArray: crtys.crtys,
    objectMultiArray: crtys.crtytow
  },
  bindMultiPickerChange: function (e) {
    var that = this
    that.setData({
      "multiIndex[0]": e.detail.value[0],
      "multiIndex[1]": e.detail.value[1],
      eachwrapsval4: that.data.multiArray[0][that.data.multiIndex[0]],
      eachwrapsval5: that.data.multiArray[1][that.data.multiIndex[1]]
    })
    // console.log(that.data.multiArray[0][that.data.multiIndex[0]])
    // console.log(that.data.multiArray[1][that.data.multiIndex[1]])
    // console.log(that.data.multiArray)
  },
  bindMultiPickerColumnChange: function (e) {
    var that = this
    switch (e.detail.column) {
      case 0:
        list = []
        for (var i = 0; i < that.data.objectMultiArray.length; i++) {
          if (that.data.objectMultiArray[i].parid == that.data.objectMultiArray[e.detail.value].regid) {
            list.push(that.data.objectMultiArray[i].regname)
          }
        }
        that.setData({
          "multiArray[1]": list,
          "multiIndex[0]": e.detail.value,
          "multiIndex[1]": 0
        })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var heights = app.globalData.hh
    opends = wx.getStorageSync('BL_openid')
    var that = this
    that.setData({
      heights: heights,
      eachwrapsval3: that.data.eachwraps3[0]
    })
    console.log(crtys.crtys)
    that.eachwraps1()
    that.eachwraps2()
    that.setData({
      "multiIndex[0]": '',
      "multiIndex[1]": '',
    })
  },
  eachwraps1: function () {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getDeptList.ashx',
      data: {
        openID: opends,
      },
      success: function (res) {
        console.log(res)
        if (res.data.head.status == 'success') {
          var newarr = []
          var ids = []
          for (var i = 1; i < res.data.body.length; i++) {
            newarr.push(res.data.body[i].deptName)
            ids.push(res.data.body[i].id)
          }
          that.setData({
            eachwraps1: newarr,
            idss: ids,
            bid: ids[0],
            eachwrapsval: newarr[0]
          })
          console.log(ids)
        } else {
          wx.showToast({
            title: res.data.head.msg,
            icon: "none"
          })
        }

      }
    });
  },
  eachwraps2: function () {
    var that = this
    wx.request({
      url: AjaxUrl.AjaxUrl + 'getEmployeeList.ashx',
      data: {
        openID: opends,
      },
      success: function (res) {
        console.log(res)
        if (res.data.head.status == 'success') {
          var newarr = []
          var yids = []
          for (var i = 1; i < res.data.body.length; i++) {
            newarr.push(res.data.body[i].employeeName)
            yids.push(res.data.body[i].id)
          }
          that.setData({
            eachwraps2: newarr,
            eachwrapsval2: newarr[0],
            yewuids: yids,
            yewuidss: yids[0]
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
  // eachwraps4: function (e) {
  //   var that = this
  //   console.log(e)
  // wx.request({
  //   url: AjaxUrl.AjaxUrl + 'getProvinceList.ashx',
  //   data: {
  //     openID: 111,
  //   },
  //   success: function (res) {
  //     // console.log(res)
  //     if (res.data.head.status == 'success') {
  //       var newarr = []
  //       for (var i = 0; i < res.data.body.length; i++) {
  //         newarr.push(res.data.body[i].province)
  //       }
  //       that.setData({
  //         eachwraps4: newarr,
  //         eachwrapsval4: newarr[0],
  //         eachwraps5: newarr,
  //         eachwrapsval5: newarr[0],
  //       })
  //     } else {
  //       wx.showToast({
  //         title: res.data.head.msg,
  //         icon: "none"
  //       })
  //     }

  //   }
  // });
  // },
  eachwrapsclick: function (e) {
    var that = this;
    // console.log(e.detail.value)
    that.setData({
      eachwrapsval: that.data.eachwraps1[e.detail.value],
      bid: that.data.idss[e.detail.value]
    })
  },
  eachwrapsclick2: function (e) {
    var that = this;
    that.setData({
      eachwrapsval2: that.data.eachwraps2[e.detail.value],
      yewuidss: that.data.yewuids[e.detail.value],
    })
  },
  eachwrapsclick3: function (e) {
    var that = this;
    that.setData({
      eachwrapsval3: that.data.eachwraps3[e.detail.value]
    })
  },
  eachwrapsclick4: function (e) {
    var that = this;
    that.setData({
      eachwrapsval4: that.data.eachwraps4[e.detail.value]
    })
  },
  eachwrapsclick5: function (e) {
    var that = this;
    that.setData({
      eachwrapsval5: that.data.eachwraps5[e.detail.value]
    })
  },

  phonedInput1: function (e) {
    var that = this
    this.setData({
      inputs1: e.detail.value
    })
  },
  phonedInput2: function (e) {
    var that = this
    this.setData({
      inputs2: e.detail.value
    })
  },
  phonedInput3: function (e) {
    var that = this
    this.setData({
      inputs3: e.detail.value
    })
  },
  phonedInput4: function (e) {
    var that = this
    this.setData({
      inputs4: e.detail.value
    })
  },
  phonedInput5: function (e) {
    var that = this
    this.setData({
      inputs5: e.detail.value
    })
  },
  phonedInput6: function (e) {
    var that = this
    this.setData({
      inputs6: e.detail.value
    })
  },
  phonedInput7: function (e) {
    var that = this
    this.setData({
      inputs7: e.detail.value
    })
  },
  phonedInput8: function (e) {
    var that = this
    this.setData({
      inputs8: e.detail.value
    })
  },
  phonedInput9: function (e) {
    var that = this
    this.setData({
      inputs9: e.detail.value
    })
  },
  phonedInput10: function (e) {
    var that = this
    this.setData({
      inputs10: e.detail.value
    })
  },
  phonedInput11: function (e) {
    var that = this
    this.setData({
      inputs11: e.detail.value
    })
  },
  sets: function () {
    var that = this
    // console.log(that.data.inputs1)
    // console.log(that.data.inputs2)
    // console.log(that.data.inputs3)
    // console.log(that.data.inputs4)
    // console.log(that.data.inputs5)
    // console.log(that.data.inputs6)
    // console.log(that.data.inputs7)
    // console.log(that.data.inputs8)
    // console.log(that.data.inputs9)
    // console.log(that.data.inputs10)
    // console.log(that.data.inputs11)
    // console.log(that.data.bid + '---部门id')
    // console.log(that.data.yewuidss + '---业务员id')
    // console.log(that.data.eachwrapsval3 + '---价格分类')
    // console.log(that.data.eachwrapsval4 + '---省份')
    // console.log(that.data.eachwrapsval5 + '---城市')

    if (that.data.inputs1 == '') {
      wx.showToast({
        title: '请输入客户名称！',
        icon: 'none'
      })
    } else if (that.data.bid == '') {
      wx.showToast({
        title: '请选择部门！',
        icon: 'none'
      })
    } else if (that.data.yewuidss == '') {
      wx.showToast({
        title: '请选择业务员！',
        icon: 'none'
      })
    } else {
      wx.request({
        url: AjaxUrl.AjaxUrl + 'CustomerAdd.ashx',
        data: {
          Customer: {
            openID: opends,
            CGUnitName: that.data.inputs1,
            contactPerson: that.data.inputs2,
            deptID: that.data.bid,//代表部门ID
            employeeID: that.data.yewuidss,// 业务员ID
            priceModel: that.data.eachwrapsval3,
            mobilePhone: that.data.inputs3,
            province: that.data.eachwrapsval4,//  代表省份
            city: that.data.eachwrapsval5,
            memoInfo: that.data.inputs5,//备注
            phoneNumber: that.data.inputs6,//固定电话
            faxNumber: that.data.inputs7,//传真
            otherPhone1: that.data.inputs8,
            otherPhone2: that.data.inputs9,
            otherPhone3: that.data.inputs10,
            otherPhone4: that.data.inputs11,
            address: that.data.inputs4,
          }
        },
        success: function (res) {
          console.log(res)
          if (res.data.head.status == 'true') {
            wx.showToast({
              title: res.data.head.msg,
              icon: "none",
              duration: 2000,
            })
            wx.setStorageSync('addsty', -1)
            setTimeout(function () {
              wx.navigateBack({})
            }, 2000)
          } else {
            wx.showToast({
              title: res.data.head.msg,
              icon: "none"
            })
          }
        }
      });
    }

  },
  moreall: function () {
    var that = this
    if (that.data.moremsg == true) {
      that.setData({
        moremsg: false
      })
    } else {
      that.setData({
        moremsg: true
      })
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