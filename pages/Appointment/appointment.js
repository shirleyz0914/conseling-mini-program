import logger from '../../utils/logger';

const app = getApp();

// status: 0 - busy/unavailable, 1 - free/available
const defaultCounselerList = [
  { "id": 1, "name": "Counseler 1", "avatarUrl": "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png", "averageScore": 4.5, "status": 0 },
  { "id": 2, "name": "Counseler 1", "avatarUrl": "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png", "averageScore": 4.3, "status": 1 },
  { "id": 3, "name": "Counseler 1", "avatarUrl": "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png", "averageScore": 4.8, "status": 1 }
];


Page({
  data: {
    counselerList: defaultCounselerList,
  },
  makeAppointment() {
    console.log("----预约-----");
    wx.navigateTo({
      url: '../SignConsent/signConsent',
    })
  },
  goWaitingList(id) {
    console.log("----等待-----");
    wx.navigateTo({
      url: '../WaitList/waitList',
    })
  }
});