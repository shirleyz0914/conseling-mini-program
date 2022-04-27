const app = getApp();

Page({
  data: {
    visitorName: 'VV',
    counName: 'CC',
    messageList: [],
    conversationID: '',
    isCompleted: false, // 当前会话消息是否已经请求完毕
    nextReqMessageID: '', // 下一条消息标志
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

    /*
    var that = this;
    let promise = wx.$TUIKit.getMessageList({
      conversationID: this.data.conversationID,
      count: 15
    });
    promise.then(function (imResponse) {
      //console.log(imResponse);
      const messages = imResponse.data.messageList; // 消息列表
      
      //时间戳->标准时间
      for (var i = 0; i < messages.length; ++i) {
        var util = require("../../utils/util.js");
        messages[i].time = util.js_date_time(messages[i].time);
      }
      that.setData({
        messageList: messages
      });
    });
    */
    
    setInterval(() => {
      this.getMessageList();
     },2000)
  },

  // 获取消息列表
  getMessageList() {
    if (!this.data.isCompleted) {
      wx.$TUIKit.getMessageList({
        conversationID: this.data.conversationID,
        nextReqMessageID: this.data.nextReqMessageID,
        count: 15,
      }).then((res) => {
        const {
          messageList
        } = res.data; // 消息列表
        //时间戳->标准时间
        for (var i = 0; i < messageList.length; ++i) {
          var util = require("../../utils/util.js");
          messageList[i].time = util.js_date_time(messageList[i].time);
        }
        this.data.nextReqMessageID = res.data.nextReqMessageID;
        this.data.isCompleted = res.data.isCompleted; // 表示是否已经拉完所有消息。
        //this.data.messageList = [...messageList, ...this.data.messageList];
        this.setData({
          messageList: [...messageList, ...this.data.messageList],
        })
        if (!this.data.isCompleted) {
          this.getMessageList();
        }
      });
    }
  },

})