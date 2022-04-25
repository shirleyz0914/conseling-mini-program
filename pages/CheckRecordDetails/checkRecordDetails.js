const app = getApp();

Page({
  data: {
    conversationName: '聊天记录',
    visitorName:'VV',
    counName:'CC',
    conversation: {},
    messageList: [],
    conversationID: '',
    config: {
      sdkAppID: '',
      userID: '',
      userSig: '',
      type: 1,
      tim: null,
    },
  },
 
  goBack() {
    wx.navigateTo({
      url: `../CheckConsultRecords/checkConsultRecords`,
    })
  },

  /*
  getMessageList() {
    const currentCounID = this.data.counID;
    let promise1 = wx.$TUIKit.getMessageList({
      conversationID: this.data.conversationID,
      count: 20
    });
    promise1.then(function (imResponse) {
      var messages = imResponse.data.messageList; // 消息列表。
    });
  },
  */

})