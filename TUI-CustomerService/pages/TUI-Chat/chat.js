import logger from '../../utils/logger';
// eslint-disable-next-line no-undef
const app = getApp();
// eslint-disable-next-line no-undef
Page({

  /**
   * 页面的初始数据
   */
  data: {
    conversationName: 'XXX',
    counID: '',
    conversation: {},
    messageList: [],
    isShow: false,
    showImage: false,
    showChat: true,
    conversationID: '',
    config: {
      sdkAppID: '',
      userID: '',
      userSig: '',
      type: 1,
      tim: null,
    },
    unreadCount: 0,

    h: '00',
    m: '00',
    s: '00',
  },

  consultTime() {
    const that = this;
    var hour = that.data.h;
    var minute = that.data.m;
    var second = that.data.s;
    var ms = 0
    setInterval(function () {
      second++;
      if (second >= 60) {
        second = 0;
        minute++;
        if (minute >= 60) {
          minute = 0;
          hour++;
          that.setData({
            h: (hour < 10 ? '0' + hour : hour)
          });
        } else {
          that.setData({
            m: (minute < 10 ? '0' + minute : minute)
          })
        }
      } else {
        that.setData({
          s: (second < 10 ? '0' + second : second)
        })
      }
    }, 1000)
  },
  goEvaluate(){
    // var times = Date.now();
    // var end_time = new Date(times).toLocaleString('chinese', {hour12: false}).replaceAll('/', '-');
    // const visitor_id = wx.getStorageSync('visitor_id');
    // const coun_id = wx.getStorageSync('coun_id');
    // const begin_time = wx.getStorageSync('begin_time');
    // wx.request({
    //   url: 'http://1.15.129.51:3000/record',
    //   method: 'POST',
    //   data: {
    //     "visitor_id": visitor_id,
    //     "coun_id": coun_id,
    //     "help_or_not": 0,
    //     "sup_id": -1,
    //     "begin_time": begin_time,
    //     "end_time": end_time
    //   }
    // })
    this.selectComponent('#message-input').handleServiceEvaluation();
  },
  counID: '',
  goSendRecords() {
    const currentCounID = this.data.counID;
    let promise1 = wx.$TUIKit.getMessageList({
      conversationID: this.data.conversationID,
      count: 20
    });
    promise1.then(function (imResponse) {
      var messages = imResponse.data.messageList; // 消息列表。
  
      let mergerMessage = wx.$TUIKit.createMergerMessage({
        to: currentCounID, //咨询师的userID
        conversationType: 'C2C',
        payload: {
          messageList: messages,
          title: '聊天记录',
          abstractList: ['allen: 666', 'iris: [图片]', 'linda: [文件]'],
          compatibleText: '请升级IMSDK到v2.10.1或更高版本查看此消息'
        },
      });

      let promise2 = wx.$TUIKit.sendMessage(mergerMessage);
      promise2.then(function (imResponse) {
        // 发送成功
        console.log(imResponse);
        wx.showModal({
          title: '转发聊天记录成功！',
          showCancel: false,
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }).catch(function (imError) {
        // 发送失败
        console.warn('sendMessage error:', imError);
      });
    });

    /*
    wx.navigateTo({
      url: `../../../pages/ExportConsultRecords/exportConsultRecords`,
    })
    */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.consultTime();

    const {
      config
    } = this.data;
    config.sdkAppID = app.globalData.SDKAppID;
    config.userID = app.globalData.userInfo.userID;
    config.userSig = app.globalData.userInfo.userSig;
    config.tim = wx.$TUIKit;
    this.setData({
      config,
    }, () => {
      this.TRTCCalling = this.selectComponent('#tui-calling');
      this.TRTCCalling.init();
    });
    // conversationID: C2C、 GROUP
    // logger.log(`| TUI-chat | onLoad | conversationInfomation: ${options.conversationInfomation}`);
    const payloadData = JSON.parse(options.conversationInfomation);
    const unreadCount = payloadData.unreadCount ? payloadData.unreadCount : 0;
    this.setData({
      conversationID: payloadData.conversationID,
      unreadCount,
    });
    wx.$TUIKit.setMessageRead({
      conversationID: this.data.conversationID
    }).then(() => {
      logger.log('| TUI-chat | setMessageRead | ok');
    });
    wx.$TUIKit.getConversationProfile(this.data.conversationID).then((res) => {
      const {
        conversation
      } = res.data;
      this.setData({
        conversationName: this.getConversationName(conversation),
        //咨询师的userID
        counID: this.getCounID(conversation),
        conversation,
        isShow: conversation.type === 'GROUP',
      });
    });
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.TRTCCalling.destroyed();
  },
  getConversationName(conversation) {
    if (conversation.type === '@TIM#SYSTEM') {
      this.setData({
        showChat: false,
      });
      return '系统通知';
    }
    if (conversation.type === 'C2C') {
      return conversation.userProfile.nick;
      //return conversation.remark || conversation.userProfile.nick || conversation.userProfile.userID;
    }
    if (conversation.type === 'GROUP') {
      return conversation.groupProfile.name || conversation.groupProfile.groupID;
    }
  },
  getCounID(conversation) {
    if (conversation.type === 'C2C') {
      return conversation.userProfile.userID;
    }
  },
  sendMessage(event) {
    // 将自己发送的消息写进消息列表里面
    this.selectComponent('#message-list').updateMessageList(event.detail.message);
  },
  showMessageErrorImage(event) {
    this.selectComponent('#message-list').sendMessageError(event);
  },
  triggerClose() {
    this.selectComponent('#message-input').handleClose();
  },
  handleCall(event) {
    if (event.detail.groupID) {
      this.TRTCCalling.groupCall(event.detail);
    } else {
      this.TRTCCalling.call(event.detail);
    }
  },

  changeMemberCount(event) {
    this.selectComponent('#group-profile').updateMemberCount(event.detail.groupOptionsNumber);
  },
  resendMessage(event) {
    this.selectComponent('#message-input').onInputValueChange(event);
  },
});