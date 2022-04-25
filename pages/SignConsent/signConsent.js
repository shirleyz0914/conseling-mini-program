import { setTokenStorage } from '../../utils/token'
import logger from '../../utils/logger'
import { genTestUserSig } from '../../debug/GenerateTestUserSig'

const app = getApp()
Page({
  data: {
    userID: '',
    hidden: false,
    privateAgree: false,
    code: '',
    path: '',
    lastTime: 0,
    countryIndicatorStatus: false,
    headerHeight: app.globalData.headerHeight,
    statusBarHeight: app.globalData.statusBarHeight,
  },
  onLoad(option) {
  },

  onShow() {
  },
  // Token没过期可以利用Token登陆
  // loginWithToken() {
  //   wx.switchTab({
  //     url: '../Index/index',
  //   })
  // },
  // 回退
  onBack() {
    wx.navigateTo({
      url: '../Index/Index',
    })
  },
  // 输入userID
  bindUserIDInput(e) {
    const val = e.detail.value
    this.setData({
      userID: val,
    })
  },
  onAgreePrivateProtocol() {
    this.setData({
      privateAgree: !this.data.privateAgree,
    })
  },
  goCounseling() {
    const coun_id = wx.getStorageSync('coun_id');
    // wx.request({
    //   url: 'http://1.15.129.51:3000/wx-users/changeCounsellorStauts',
    //   method: 'PUT',
    //   data: {
    //     "coun_id": coun_id,
    //     "coun_status": "busy"
    //   },
    //   success: (res) => {
    //     if (res.statusCode === 200 && res.data.Code === 0) {
    const payloadData = wx.getStorageSync('payloadData');
    var times = Date.now();
    var begin_time = new Date(times).toLocaleString('chinese', {hour12: false}).replaceAll('/', '-');
    wx.setStorageSync('begin_time', begin_time);
    wx.navigateTo({
      url: `../../TUI-CustomerService/pages/TUI-Chat/chat?conversationInfomation=${JSON.stringify(payloadData)}`,
    })
    //     } 
    //   }
    // });
  }
})
