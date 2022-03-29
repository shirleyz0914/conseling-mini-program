// miniprogram/pages/Index/TUI-create.js
import logger from '../../utils/logger';

// eslint-disable-next-line no-undef
const app = getApp();
const defaultNickName = 'ss';
const defaultPhoneNumber = '13012876102';
const defaultConselHistoryList = [
  { id: '1', name: '咨询师1', avatarUrl: "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png", time: '2022/01/24 13:35:00', period: '01小时23分钟', score: 5 },
  { id: '2', name: '咨询师2', avatarUrl: "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png", time: 'YYYY/MM/DD HH:MM:SS', period: 'xx小时XX分钟', score: 4 },
  { id: '3', name: '咨询师3', avatarUrl: "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png", time: 'YYYY/MM/DD HH:MM:SS', period: 'xx小时XX分钟', score: 5},
  { id: '4', name: '咨询师4', avatarUrl: "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png", time: 'YYYY/MM/DD HH:MM:SS', period: 'xx小时XX分钟', score: 5},
];
// eslint-disable-next-line no-undef
Page({
  /**
   * 页面的初始数据
   */
  data: {
    counselHistoryList: null,
    nickName: null,
    phoneNumber: null,
    numberShow: null,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.checkLoginStatus();
  },
  checkLoginStatus() {
    let token = wx.getStorageSync('token');
    let isLogin = wx.getStorageSync('islogin');
    console.log("----Token:", token);
    if (token == undefined || isLogin == false) {
      wx.redirectTo({
        url: '../Login/login',
      })
    }
  },
  onShow() {
    this.setData({
      counselHistoryList: defaultConselHistoryList,
      nickName: defaultNickName,
      phoneNumber: defaultPhoneNumber,
      numberShow: defaultPhoneNumber.substr(0,3) + "****" + defaultPhoneNumber.substr(7,4)
    })
  },
  eidtProfile() {
    wx.navigateTo({
      url: '../Profile/profile',
    })
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
  goConseling() {
    wx.switchTab({
      url: '../Appointment/appointment',
    });
  },
  // handleOnPageNavigate(event) {
  //   const tab = event.currentTarget.dataset.item;
  //   if (!tab.url) {
  //     wx.navigateToMiniProgram({
  //       appId: 'wx3b91b7aaa809ecf9',
  //     });
  //   } else {
  //     wx.navigateTo({
  //       url: tab.url,
  //     });
  //   }
  // }
});
