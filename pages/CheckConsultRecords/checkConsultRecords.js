const app = getApp()

Page({
  data: {
    recordList: [], //咨询记录列表
    currentRecord: {}, //id, name, nick, time
  },
  onShow() {
      this.getConsultRecords();
  },
  
  getConsultRecords() {
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
            const consultHistory = this.data.recordList;
            for (var i = 0; i < consultList.length; i++) {
              const {
                coun_id,
                uname,
                coun_name,
                begin_time,
              } = consultList[i];

              const std_time = new Date(begin_time);
              const consultRecord = {
                id: coun_id,
                name: uname,
                nick: coun_name,
                time: std_time.toLocaleString('chinese', {
                  hour12: false
                }),
              };
              consultHistory.push(consultRecord);
            }
            this.setData({
              recordList: consultHistory,
            })
          }
        }
      }
    })
  },


  goCheckDetails: function (e) {
    var index = parseInt(e.currentTarget.dataset.bindex)
    this.setData({
      currentRecord: this.data.recordList[index],
    }, () => {
      console.log("currentRecord设置成功")
    })

    wx.setStorageSync('currentRecord', this.data.currentRecord);

    wx.navigateTo({
      url: `../CheckRecordDetails/checkRecordDetails`,
    });

  }


});