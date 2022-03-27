import logger from '../../utils/logger';

// eslint-disable-next-line no-undef
const app = getApp();

Page({
  data: {
    profileChanged: false
  },
  onBack() {
    wx.navigateTo({
      url: '../Index/index',
    })
  }
});