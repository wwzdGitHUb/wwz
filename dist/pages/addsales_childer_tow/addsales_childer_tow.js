// pages/addsales_childer_tow/addsales_childer_tow.js
var addtow = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeslist: ['', ''],
    hiddemsg: true,
    hiddemsgtow: true,
    bzgoods: '',
    pricenum: 0,
    allnums: 0,
    numtow: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(wx.getStorageSync('number'))
  },
  // 弹窗1
  shezhi: function (e) {
    var that = this
    // e.currentTarget.dataset.indes
    that.setData({
      hiddemsg: true,
      indexlist: e.currentTarget.dataset.indes
    })
  },
  quxiao: function () {
    var that = this
    that.setData({
      hiddemsg: false,
    })
  },
  // 弹窗2
  layertow: function () {
    var that = this
    that.setData({
      hiddemsgtow: true,
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
      numtow: e.detail.value
    })
  },
  // 点击添加
  addtownum: function (e) {
    var that = this
    if (that.data.numtow == '') {
      wx.showToast({
        title: '请输入数量！',
        icon: 'none'
      })
      return false
    }
    addtow.push(that.data.numtow)
    that.setData({
      numtowlist: addtow,
      numtow: ''
    })
    that.jtow()
  },
  // 删除明细项列表中的某一项
  removetowlist: function (e) {
    var that = this
    var codeslisttow = that.data.codeslist
    codeslisttow.splice(e.currentTarget.dataset.indes, 1)
    that.setData({
      codeslist: codeslisttow
    })
  },
  add:function(){
    wx.navigateTo({
      url: '../addsales_list_tow/addsales_list_tow',
    })
  },
  // 点击弹窗上某个关闭
  closetowlist: function (e) {
    var that = this
    console.log()
    addtow.splice(e.currentTarget.dataset.indes, 1)
    that.setData({
      numtowlist: addtow
    })
  },
  // 第二个弹窗确定按钮
  succtowlist: function (e) {
    var that = this
    if (addtow == '') {
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
        allnums: allnumlisttow
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
    jtow = Number(that.data.pricenum) * Number(that.data.allnums)
    that.setData({
      allmonesa: jtow
    })

  },
  // 确定按钮
  succwone: function () {
    var that = this
    var obj = that.data.codeslist
    obj[that.data.indexlist].price = that.data.pricenum
    obj[that.data.indexlist].countP = 1
    obj[that.data.indexlist].countM = that.data.allnums
    obj[that.data.indexlist].smallMoney = that.data.allmonesa
    obj[that.data.indexlist].memoInfo = that.data.bzgoods
    obj[that.data.indexlist].meterList = that.data.numtowlist.join(',')[0]
    obj[that.data.indexlist].cutNum = that.data.numtowlist.length
    that.setData({
      codeslist: obj,
      hiddemsgtow: false
    })
    that.mxljlist()
  },
  // 累计项
  mxljlist: function () {
    var that = this
    var l_sun = 0,
      l_jmoy = 0;
    for (var i = 0; i < that.data.codeslist.length; i++) {
      l_sun += Number(that.data.codeslist[i].countM)
      l_jmoy += Number(that.data.codeslist[i].smallMoney)
    }
    that.setData({
      p_num: that.data.codeslist.length,
      s_num: l_sun,
      j_price: l_jmoy
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