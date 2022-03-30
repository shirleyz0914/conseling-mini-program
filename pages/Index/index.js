// miniprogram/pages/Index/TUI-create.js
import logger from '../../utils/logger';

// eslint-disable-next-line no-undef
const app = getApp();
const defaultNickName = 'ss';
const defaultPhoneNumber = '13012876102';

// eslint-disable-next-line no-undef
Page({
  /**
   * 页面的初始数据
   */
  data: {
    counselHistoryList: [],
    nickName: null,
    phoneNumber: null,
    numberShow: null,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({
      counselHistoryList: []
    });
    this.checkLoginStatus();
  },
  onReady() {
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
              user_name,
              visitor_phone,
              visitor_avatar,
            } = res.data.visitorInfo;
            wx.setStorageSync('visitor_id', user_id);
            this.setData({
              nickName: user_name,
              phoneNumber: visitor_phone || '',
              avatarUrl: visitor_avatar || "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png",
              numberShow: visitor_phone != '' && visitor_phone.substr(0,3) + "****" + visitor_phone.substr(7,4) || '',
            })
          }
        }
      }
    })
  },
  getConsultList() {
    const user_name = wx.getStorageSync('token').userInfo.userID;
    wx.request({
      url: 'http://1.15.129.51:3000/wx-users/record/getConsultList',
      method: 'GET',
      data: {
        "user_name": user_name,
      },
      success: (res) => {
        if (res.statusCode === 200) {
          if (res.data.code === 0) {
            const consultList = res.data.consultList;
            const consultHistory = this.data.counselHistoryList;
            for (var i = 0; i < consultList.length; i++) {
              const { coun_id, coun_name, coun_status, coun_avatar, begin_time, period, score } = consultList[i];
              const std_begin_time = new Date(begin_time);
              const consultRecord = {
                id: coun_id,
                name: coun_name,
                status: coun_status,
                avatarUrl: coun_avatar || "https://sdk-web-1252463788.cos.ap-hongkong.myqcloud.com/component/TUIKit/assets/avatar_21.png",
                time: std_begin_time.toLocaleString('chinese', {hour12: false}),
                period,
                score
              };
              consultHistory.push(consultRecord);
              this.setData({
                counselHistoryList: consultHistory,
              });
            }
          }
        }
      }
    })
  },
  checkLoginStatus() {
    let token = wx.getStorageSync('token');
    let isLogin = wx.getStorageSync('islogin');
    console.log("----Token:", token);
    if (token == undefined || isLogin == false) {
      wx.redirectTo({
        url: '../Login/login',
      })
    } else {
      this.getVisitorInfo();
      this.getConsultList();
    }
  },
  eidtProfile() {
    wx.navigateTo({
      url: '../Profile/profile',
    })
  },
  goRecounsult(event){
    const payloadData = {
      conversationID: `C2C${event.currentTarget.dataset.item.name}`,
    };
    const status = event.currentTarget.dataset.item.status;
    if (status === "offline" || status === undefined) {
      wx.showToast({
        title: '该咨询师目前不在线，无法提供服务。',
        icon: 'none',
        duration: 2000,
      });
    } else if (status === "free") {
      wx.setStorageSync('payloadData', payloadData);
      wx.navigateTo({
        url: `../SignConsent/signConsent`,
      })
    } else if (status === "busy") {
      wx.setStorageSync('payloadData', payloadData);
      wx.navigateTo({
        url: `../WaitList/waitList`,
      })
    }
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
