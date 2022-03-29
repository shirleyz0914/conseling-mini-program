import logger from '../../utils/logger';

// eslint-disable-next-line no-undef
const app = getApp();
const defaultAvatarUrl = "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png";

Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    profileChanged: false,
    realName: '',
    phoneNumber: '',
    contactName: '',
    contactPhone: ''
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    this.setData({
      avatarUrl,
      profileChanged: true
    });
  },
  bindNameInput(e) {
    const val = e.target.value;
    this.setData({
      realName: val,
      profileChanged: true
    })
  },
  bindPhoneInput(e) {
    const val = e.target.value;
    this.setData({
      phoneNumber: val,
      profileChanged: true
    })
  },
  bindContactNameInput(e) {
    const val = e.target.value;
    this.setData({
      contactName: val,
      profileChanged: true
    })
  },
  bindContactInput(e) {
    const val = e.target.value;
    this.setData({
      contactPhone: val,
      profileChanged: true
    })
  },
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
  confirmChange(){
    console.log("----确认修改-----");
    const { realName, phoneNumber, contactName, contactPhone } = this.data;
    wx.request({
      url: 'http://1.15.129.51:3000/editUsers/wx/visitor',
      method: 'POST',
      data: {
        "user_id": null,
        "user_name": "TestUser",
        "role": "visitor",
        "visitor_id": null,
        "visitor_name": realName,
        "visitor_gender": "Male",
        "visitor_phone": phoneNumber,
        "visitor_status": "nulla ut",
        "avatarUrl": avatarUrl
      },
      success: (res) => {

      }
    })
  }
});