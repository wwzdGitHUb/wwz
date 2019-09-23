Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  kehuziliao: function () {
    wx.navigateTo({
      url: '../kehu/kehu',
    })
  },
  // 销售历史
  lishi: function () {
    wx.navigateTo({
      url: '../l_history/l_history',
    })
  },
  // 欠款查询
  qiankuan: function () {
    wx.navigateTo({
      url: '../q_debt/q_debt',
    })
  },
  // 客户活跃度查询
  h_liveness: function () {
    wx.navigateTo({
      url: '../h_liveness/h_liveness',
    })
  },
  // 库存查询
  k_regier:function(){
    wx.navigateTo({
      url: '../k_regier/k_regier',
    })
  },
  // 经营概况
  J_general:function(){
    wx.navigateTo({
      url: '../J_general/J_general',
    })
  },
  // 客户销售
  k_xpaihang:function(){
    wx.navigateTo({
      url: '../k_xpaihang/k_xpaihang',
    })
  },
  x_model:function(){
    wx.navigateTo({
      url: '../x_model/x_model',
    })
  },
  // 业务员
  y_salesman:function(){
    wx.navigateTo({
      url: '../y_salesman/y_salesman',
    })
  },
  q_area:function(){
    wx.navigateTo({
      url: '../q_area/q_area',
    })
  },
  s_gathering:function(){
    wx.navigateTo({
      url: '../s_gathering/s_gathering',
    })
  },
  x_prices:function(){
    wx.navigateTo({
      url: '../x_prices/x_prices',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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