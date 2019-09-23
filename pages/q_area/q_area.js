// pages/l_history/l_history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexs: 0,
    blocks: false,
    category: [
      '河南', '山东'
    ],
    categorytow: [
      'a', 'b'
    ],
    date1: '',
    date2: ''
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

  },
  // 日期切换
  styles: function (e) {
    var that = this
    that.setData({
      indexs: e.currentTarget.dataset.indxs
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
 
  // 省份
  changes: function (e) {
    var num = e.detail.value;
    this.setData({
      styles: num
    })

  },
  // 部门
  changestown: function (e) {
    var num = e.detail.value;
    this.setData({
      stylestow: num
    })

  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.fun_date(0)
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