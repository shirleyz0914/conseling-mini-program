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
  // login() {
  //   const userID = this.data.userID
  //   const userSig = genTestUserSig(userID).userSig
  //   logger.log(`TUI-login | login  | userSig:${userSig} userID:${userID}`)
  //   app.globalData.userInfo = {
  //     userSig,
  //     userID,
  //   }
  //   if (this.data.path && this.data.path !== 'undefined') {
  //     wx.redirectTo({
  //       url: this.data.path,
  //     })
  //   } else {
  //     wx.switchTab({
  //       url: '../Index/index',
  //     })
  //   }
  // },
  onAgreePrivateProtocol() {
    this.setData({
      privateAgree: !this.data.privateAgree,
    })
  },
  goCounseling() {
    const payloadData = wx.getStorageSync('payloadData');
    wx.navigateTo({
      url: `../../TUI-CustomerService/pages/TUI-Chat/chat?conversationInfomation=${JSON.stringify(payloadData)}`,
    })
  }
})
