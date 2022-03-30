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
    } else if (password.length < 6) {
      wx.showModal({
        title: '提示',
        content: '为了您的账户安全，请设置六位及以上密码。',
        showCancel: false
      });
    } else if (phone.length != 11) {
      wx.showModal({
        title: '提示',
        content: '请正确输入11位手机号码。',
        showCancel: false
      });
    } else if (userName.length < 1) {
      wx.showModal({
        title: '提示',
        content: '请填写用户名。',
        showCancel: false
      });
    } else {
      wx.request({
        url: 'http://1.15.129.51:3000/wx-users/register',
        method: 'POST',
        data: {
          "user_name": userName,
          "visitor_phone": phone,
          "user_password": password,
        },
        success: (res) => {
          console.log("----注册-----", res);
          if (res.statusCode === 200) {
            if (res.data.errCode === 0) {
              wx.redirectTo({
                url: '../Profile/profile',
              })
            } else if (res.data.errCode === 2) {
              wx.showModal({
                title: '提示',
                content: '用户名已存在，请重新填写',
                showCancel: false
              })
            } else {
              wx.showToast({
                title: '系统异常，请稍后重试。',
                icon: 'none',
                duration: 2000
              })
            }
          } else {
            wx.showToast({
              title: '系统异常，请稍后重试。',
              icon: 'none',
              duration: 2000
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
  goLogin() {
    wx.navigateBack({
      delta: 1,
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
