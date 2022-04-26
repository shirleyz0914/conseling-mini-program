const app = getApp();

Page({
  data: {
    visitorName: 'VV',
    counName: 'CC',
    conversation: {},
    messageList: [],
    conversationID: '',
  },

  goBack() {
    wx.navigateTo({
      url: `../CheckConsultRecords/checkConsultRecords`,
    })
  },

  onLoad: function (option) {
    const userID = app.globalData.userInfo.userID;
    const record = wx.getStorageSync('currentRecord');
    this.setData({
      visitorName: userID,
      counName: record.nick,
      conversationID: 'C2C' + record.name,
    });

    var that = this;
    let promise = wx.$TUIKit.getMessageList({
      conversationID: this.data.conversationID,
      count: 20
    });
    promise.then(function (imResponse) {
      //console.log(imResponse);
       const messages = imResponse.data.messageList; // 消息列表
       that.setData({
        messageList: messages
      });
    });

  },

  
})