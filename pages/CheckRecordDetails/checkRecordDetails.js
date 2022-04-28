const app = getApp();

Page({
  data: {
    counName: 'CC',
    messageList: [],
    conversationID: '',
    isCompleted: false, // 当前会话消息是否已经请求完毕
    nextReqMessageID: '', // 下一条消息标志
  },

  goBack() {
    wx.switchTab({
      url: '../CheckConsultRecords/checkConsultRecords',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  },

  onLoad: function (option) {
    this.getMessageList();
  },

  // 获取消息列表
  getMessageList() {
    const record_id = wx.getStorageSync('currentRecord').recordID;
    const coun_name = wx.getStorageSync('currentRecord').nick;
    wx.request({
      url: 'http://1.15.129.51:3000/record/content',
      method: 'GET',
      data: {
        "record_id": record_id,
      },
      success: (res) => {
        this.setData({
          messageList: res.data,
          counName: coun_name
        })
      }
    })
  },

})