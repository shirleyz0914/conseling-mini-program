import logger from '../../utils/logger';

const app = getApp();
const defaultCounselorInfo = { "id": 3, "name": "Counseler 1", "avatarUrl": "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png", "averageScore": 4.8, "status": 1 };

Page({
  data: {
    counselorInfo: null,
    h: '00',
    m: '00',
    s: '00',
    coun_status: 'busy'
  },
  queryTime() {
    const that = this;
    var hour = that.data.h;
    var minute = that.data.m;
    var second = that.data.s;
    var ms = 0
    setInterval(function() {
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
    }, 1000)
  },
  onLoad(options) {
    this.queryTime();
    const counselerInfo = JSON.parse(options.counInfo);
    this.setData({
      counselorInfo: counselerInfo
    });
    this.getCounsellerInfo();
  },
  getCounsellerInfo() {
    const coun_id = wx.getStorageSync('coun_id');
    wx.request({
      url: 'http://1.15.129.51:3000/wx-users/schedule/getCounsellorStatus',
      method: 'GET',
      data: {
        "coun_id": coun_id
      },
      success: (res) => {
        if (res.statusCode === 200) {
          if (res.data.code === 0) {
            this.setData({coun_status: res.data.coun_status});
            if (this.data.coun_status != "free") {
              setTimeout(()=> {
                this.getCounsellerInfo();
              }, 2000);
            } else {
              wx.navigateTo({
                url: `../SignConsent/signConsent`,
              });
            }
          }
        }
      }
    })
  },
  goCancel() {
    console.log("-----取消咨询------");
    clearInterval();
    wx.switchTab({
      url: '../Index/index'
    });
  }
});