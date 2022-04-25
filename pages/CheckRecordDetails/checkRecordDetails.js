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

  goBack(){
    wx.navigateTo({
      url: `../CheckConsultRecords/checkConsultRecords`,
    })
  },

})