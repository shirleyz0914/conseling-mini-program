import logger from '../../utils/logger';
// eslint-disable-next-line no-undef
const app = getApp();
// eslint-disable-next-line no-undef
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conversationName: 'XX 与 XX 的聊天记录',
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

  goSendRecords() {
    const currentCounID = this.data.counID;
    let promise1 = wx.$TUIKit.getMessageList({
      conversationID: this.data.conversationID,
      count: 20
    });
    promise1.then(function (imResponse) {
      var messages = imResponse.data.messageList; // 消息列表。
    });
  },

})