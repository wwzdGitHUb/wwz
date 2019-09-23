// pages/kehudetail/kehudetail.js
var opends;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    opends = wx.getStorageSync('BL_openid')
    console.log(options)
    that.setData({
      names: options.names,
      sheng: options.provinces,
      crtys: options.citys,
      addre: options.addre,
      pho: options.pho,
      chuan: options.ch,
      gu1: options.guhua1,
      gu2: options.guhua2,
      gu3: options.guhua3,
      gu4: options.guhua4,
      bzend: options.beizhu,
      phoness: options.gu1
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