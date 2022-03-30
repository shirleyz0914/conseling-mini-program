import logger from '../../utils/logger';

const app = getApp();

Page({
  data: {
    counselerList: [],
    defaultAvatarUrl: "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png",
    choseCounseler: ''
  },
  onLoad() {
    this.getCounsellorList();
  },
  getCounsellorList() {
    wx.request({
      url: 'http://1.15.129.51:3000/wx-users/getCounsellorList',
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          if (res.data.code === 0) {
            this.setData({
              counselerList: res.data.counsellorList
            });
            console.log("---咨询师信息加载完毕---");
          }
        }
      }
    })
  },
  makeAppointment(event) {
    const payloadData = {
      conversationID: `C2C${event.currentTarget.dataset.counselerUsername}`,
    };
    const coun_id = event.currentTarget.dataset.counid;
    wx.setStorageSync('payloadData', payloadData);
    wx.setStorageSync('coun_id', coun_id);
    console.log("----预约-----", payloadData);
    wx.navigateTo({
      url: `../SignConsent/signConsent`,
    })
  },
  goWaitingList(event) {
    const payloadData = {
      conversationID: `C2C${event.currentTarget.dataset.counselerUsername}`,
    };
    wx.setStorageSync('payloadData', payloadData);
    console.log("----等待-----", payloadData);
    wx.navigateTo({
      url: `../WaitList/waitList`,
    })
  }
});