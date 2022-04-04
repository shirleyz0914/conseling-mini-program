import { setTokenStorage } from '../../utils/token'
import logger from '../../utils/logger'
import { genTestUserSig } from '../../debug/GenerateTestUserSig'

const app = getApp()
Page({
  data: {
    usesr_name: '',
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
    this.loginWithToken;
  },
  onShow() {
  },
  // Token没过期可以利用Token登陆
  loginWithToken() {
    wx.switchTab({
      url: '../Index/index',
    })
  },
  // 输入手机号
  bindUserNameInput(e) {
    const val = e.detail.value
    this.setData({
      user_name: val,
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
    wx.request({
      url: 'http://1.15.129.51:3000/wx-users/login',
      method: 'POST',
      data: {
        "user_name": this.data.user_name,
        "user_password": this.data.password
      },
      success: (res) => {
        if (res.statusCode === 200){
          // 接口请求成功
          if (res.data.errCode === 0) {
            // 成功情况
            const userID = this.data.user_name;
            const userSig = genTestUserSig(userID).userSig;
            app.globalData.userInfo = {
              userSig,
              userID: userID,
            };
            wx.setStorageSync('islogin', true);
            setTokenStorage({
              userInfo: app.globalData.userInfo,
            });
            wx.$TUIKit.login({
              userID: app.globalData.userInfo.userID,
              userSig: app.globalData.userInfo.userSig,
            }).then(() => {
              console.log("---登录成功---");
              wx.switchTab({
                url: '../Index/index',
              });
            }).catch(() => {
              console.log("---登录失败---");
            });
          } else if (res.data.errCode === 8) {
            wx.showModal({
              title: '提示',
              content: '用户名或密码错误，请再次确认。未注册用户请先完成注册。',
              showCancel: false
            })
          } else if (res.data.errCode === 15) {
            wx.showModal({
              title: '提示',
              content: '账户异常，已被禁用。',
              showCancel: false
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '系统错误，请稍后重试。',
              showCancel: false
            })
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '系统错误，请稍后重试。',
            showCancel: false
          })
        }
      }
    })
  },
})
