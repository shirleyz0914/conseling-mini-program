import logger from '../../utils/logger';

// eslint-disable-next-line no-undef
const app = getApp();
const defaultAvatarUrl = "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png";

Page({
  data: {
    avatarUrl: defaultAvatarUrl,
    userName: '',
    profileChanged: false,
    realName: '',
    phoneNumber: '',
    contactName: '',
    contactPhone: '',
    userID: '',
  },
  getVisitorInfo(){
    const user_name = wx.getStorageSync('token').userInfo.userID;
    wx.request({
      url: 'http://1.15.129.51:3000/wx-users/getVisitorInfo',
      method: 'GET',
      data: {
        "user_name": user_name,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          if (res.data.code === 0) {
            const {
              user_id,
              visitor_avatar,
              visitor_name,
              visitor_phone,
              emergency_name,
              emergency_phone
            } = res.data.visitorInfo;
            this.setData({
              userID: user_id,
              userName: user_name,
              avatarUrl: visitor_avatar || defaultAvatarUrl,
              realName: visitor_name || '',
              phoneNumber: visitor_phone || '',
              contactName: emergency_name || '',
              contactPhone: emergency_phone || '',
            })
          }
        }
      }
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    this.setData({
      avatarUrl,
      profileChanged: true
    });
  },
  bindNameInput(e) {
    const val = e.detail.value;
    this.setData({
      realName: val,
      profileChanged: true
    })
  },
  bindPhoneInput(e) {
    const val = e.detail.value;
    this.setData({
      phoneNumber: val,
      profileChanged: true
    })
  },
  bindContactNameInput(e) {
    const val = e.detail.value;
    this.setData({
      contactName: val,
      profileChanged: true
    })
  },
  bindContactInput(e) {
    const val = e.detail.value;
    this.setData({
      contactPhone: val,
      profileChanged: true
    })
  },
  onLoad() {
    const islogin = wx.getStorageSync('islogin');
    if (islogin === true && app.globalData.userInfo != undefined){
      wx.$TUIKit.login({
        userID: app.globalData.userInfo.userID,
        userSig: app.globalData.userInfo.userSig,
      }).then(() => {
        this.getVisitorInfo();
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
    const { userID, userName, avatarUrl, realName, phoneNumber, contactName, contactPhone } = this.data;
    wx.request({
      url: 'http://1.15.129.51:3000/wx-users/editInfo',
      method: 'PUT',
      data: {
        "user_id": userID,
        "user_name": userName,
        "visitor_name": realName,
        "visitor_phone": phoneNumber,
        "visitor_avatar": avatarUrl,
        "emergency_name": contactName,
        "emergency_phone": contactPhone,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          if (res.data.errCode === 0) {
            console.log("资料修改成功");
            let promise = wx.$TUIKit.updateMyProfile({
              nick: realName,
              avatar: avatarUrl
            });
            promise.then(function(imResponse) {
              console.log(imResponse.data);
            }).catch(function(imError) {
              console.log(imError);
            })
            wx.switchTab({
              url: '../Index/index',
              success: function (e) {
                var page = getCurrentPages().pop();
                if (page == undefined || page == null) return;
                page.onLoad();
              }
            })
          } else if (res.data.errCode === 11) {
            wx.showModal({
              title: '提示',
              content: '请填写正确的手机号码。',
              showCancel: false
            })
          } else if (res.data.errCode === 12) {
            wx.showModal({
              title: '提示',
              content: '请填写真实姓名。',
              showCancel: false
            })
          }
        }
      }
    })
  }
});