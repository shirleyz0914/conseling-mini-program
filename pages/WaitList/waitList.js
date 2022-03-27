import logger from '../../utils/logger';

const app = getApp();
const defaultCounselorInfo = { "id": 3, "name": "Counseler 1", "avatarUrl": "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png", "averageScore": 4.8, "status": 1 };

Page({
  data: {
    counselorInfo: defaultCounselorInfo,
    h: '00',
    m: '00',
    s: '00'
  },
  queryTime() {
    const that = this;
    var hour = that.data.h;
    var minute = that.data.m;
    var second = that.data.s;
    var ms = 0
    setInterval(function() {
      ms ++;
      if (ms >= 60) {
        ms = 0;
        second ++;
        if (second >= 60) {
          second = 0;
          minute ++;
          if (minute >= 60) {
            minute = 0;
            hour ++;
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
      }
    })
  },
  onLoad() {
    this.queryTime();
  },
  goCancel() {
    console.log("-----取消咨询------");
    wx.switchTab({
      url: '../Index/index'
    });
  }
});