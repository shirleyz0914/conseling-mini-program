import { setTokenStorage } from '../../utils/token'
import logger from '../../utils/logger'
import { genTestUserSig } from '../../debug/GenerateTestUserSig'

const app = getApp()
Page({
  data: {
    userName: '',
    phone: '',
    password: '',
    confirmedPassword: '',
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
  loginWithToken() {
    wx.switchTab({
      url: '../Index/index',
    })
  },
  // 回退
  onBack() {
    wx.navigateTo({
      url: '../Login/login',
    })
  },
  // 输入用户名
  bindUserNameInput(e) {
    const val = e.detail.value;
    this.setData({
      userName: val,
    })
  },
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
  // 再次输入密码
  bindPasswordConfirmedInput(e) {
    const val = e.detail.value;
    this.setData({
      confirmedPassword: val,
    })
  },
  // 注册
  register() {
    const userName = this.data.userName;
    const phone = this.data.phone;
    const password = this.data.password;
    const confirmedPassword = this.data.confirmedPassword;
    if (password !== confirmedPassword){
      wx.showModal({
        title: '提示',
        content: '密码输入不一致，请重新填写',
        showCancel: false
      });
    } else {
      wx.request({
        // url: 'http://1.15.129.51:3000/users/wx/visitor',
        url: 'http://127.0.0.1:4523/mock/738059/users/wx/visitor', //mock接口地址
        method: 'POST',
        data: {
          "user_name": userName,
          "visitor_phone": phone,
          "user_password": password,
          "role": "visitor",
          "visitor_name": null,
          "visitor_gender": null
        },
        success: (res) => {
          console.log("----注册-----", res);
          if (res.statusCode === 200) {
            wx.redirectTo({
              url: '../Profile/profile',
            })
          }
        }
      })
    }
  },
  onAgreePrivateProtocol() {
    this.setData({
      privateAgree: !this.data.privateAgree,
    })
  },

  linkToPrivacyTreaty() {
    const url = 'https://web.sdk.qcloud.com/document/Tencent-IM-Privacy-Protection-Guidelines.html'
    wx.navigateTo({
      url: `../TUI-User-Center/webview/webview?url=${url}&nav=Privacy-Protection`,
    })
  },

  linkToUserAgreement() {
    const url = 'https://web.sdk.qcloud.com/document/Tencent-IM-User-Agreement.html'
    wx.navigateTo({
      url: `../TUI-User-Center/webview/webview?url=${url}&nav=User-Agreement`,
    })
  },
})
