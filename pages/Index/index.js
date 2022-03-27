// miniprogram/pages/TUI-Index/TUI-create.js
import logger from '../../utils/logger';

// eslint-disable-next-line no-undef
const app = getApp();
// eslint-disable-next-line no-undef
Page({
  /**
   * 页面的初始数据
   */
  data: {
    counselHistoryList: [
      { name: '咨询师1', iconUrl: '../../static/assets/interactive-live.svg', time: 'YYYY/MM/DD HH:MM:SS', period: 'xx小时XX分钟', score: 5 },
      { name: '咨询师2', iconUrl: '../../static/assets/calling.svg', time: 'YYYY/MM/DD HH:MM:SS', period: 'xx小时XX分钟', score: 4 },
      { name: '咨询师3', iconUrl: '../../static/assets/interactive-live.svg', time: 'YYYY/MM/DD HH:MM:SS', period: 'xx小时XX分钟', score: 5},
      { name: '咨询师4', iconUrl: '../../static/assets/interactive-live.svg', time: 'YYYY/MM/DD HH:MM:SS', period: 'xx小时XX分钟', score: 5},
    ],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (app.globalData.userInfo != undefined){
      wx.$TUIKit.login({
        userID: app.globalData.userInfo.userID,
        userSig: app.globalData.userInfo.userSig,
      }).then(() => {
      })
        .catch(() => {
      });
    } else {
      wx.redirectTo({
        url: '../Login/login',
      })
    }
  },
  onShow() {
    logger.log(`| Index | onshow | login |userSig:${app.globalData.userInfo.userSig} userID:${app.globalData.userInfo.userID}`);
    wx.$TUIKit.login({
      userID: app.globalData.userInfo.userID,
      userSig: app.globalData.userInfo.userSig,
    }).then(() => {
    })
      .catch(() => {
      });
  },
  // 退出登陆
  quit() {
    wx.$TUIKit.logout().then(() => {
      wx.clearStorage();
      app.resetLoginData();
      wx.redirectTo({ url: '../Login/login',
        success: () => {
          wx.showToast({
            title: '退出成功',
            icon: 'none',
          });
        },
      });
    });
  },
  handleOnPageNavigate(event) {
    const tab = event.currentTarget.dataset.item;
    if (!tab.url) {
      wx.navigateToMiniProgram({
        appId: 'wx3b91b7aaa809ecf9',
      });
    } else {
      wx.navigateTo({
        url: tab.url,
      });
    }
  }
});
