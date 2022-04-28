const app = getApp();

Page({
  data: {
    counName: 'CC',
    messageList: [],
    conversationID: '',
    isCompleted: false, // 当前会话消息是否已经请求完毕
    nextReqMessageID: '', // 下一条消息标志
    userID: null,
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
    this.getUserID();
    this.getMessageList();
  },
  getUserID() {
    const userID = wx.getStorageSync('token').userInfo.userID;
    this.setData({userID});
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
        var validMessageList = [];
        for (var i = 0; i < res.data.length; ++i) {
          if (res.data[i].from_user === this.data.userID || res.data[i].to_user === this.data.userID) {
            validMessageList.push(res.data[i])
          }
        }
        this.setData({
          messageList: validMessageList,
          counName: coun_name
        })
      }
    })
  },


})