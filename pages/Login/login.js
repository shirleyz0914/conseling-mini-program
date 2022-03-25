import { setTokenStorage } from '../../utils/token'
import logger from '../../utils/logger'
import { genTestUserSig } from '../../debug/GenerateTestUserSig'

const app = getApp()
Page({
  data: {
    phone: '',
    password: '',
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
    this.setData({
      path: option.path,
    })
    wx.setStorage({
      key: 'path',
      data: option.path,
    })
  },

  onShow() {
  },
  // Token没过期可以利用Token登陆
  loginWithToken() {
    wx.switchTab({
      url: '../Index/index',
    })
  },
  // // 回退
  // onBack() {
  //   wx.navigateTo({
  //     url: '../Index/Index',
  //   })
  // },
  // 输入手机号
  bindPhoneInput(e) {
    const val = e.detail.value
    this.setData({
      phone: val,
    })
  },
  // 输入密码
  bindPasswordInput(e) {
    const val = e.detail.value;
    this.setData({
      password: val,
    })
  },
  // 跳转至注册页面
  goRegister() {
    wx.navigateTo({
      url: '../Register/register',
    })
  },
  // 登录
  login() {
    const phone = this.data.phone;
    const password = this.data.password;
    const userSig = genTestUserSig(phone).userSig
    // logger.log(`TUI-login | login  | userSig:${userSig} userID:${phone}`)
    app.globalData.userInfo = {
      userSig,
      userID: phone,
    }
    setTokenStorage({
      userInfo: app.globalData.userInfo,
    })
    if (this.data.path && this.data.path !== 'undefined') {
      wx.redirectTo({
        url: this.data.path,
      })
    } else {
      wx.switchTab({
        url: '../Index/index',
      })
    }
  },
})
