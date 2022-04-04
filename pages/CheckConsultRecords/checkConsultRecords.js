const app = getApp()

Page({
  data: {
    dataList:[] //咨询记录列表
  },
  onLoad() {
    this.getConsultRecords();
  },
  getConsultRecords() {
      const user_name = wx.getStorageSync('token').userInfo.userID;
      wx.request({
        url: 'http://1.15.129.51:3000/wx-users/record/getConsultList',
        method: 'GET',
        data:{
          "user_name": user_name,
        },

        success: (res) => {
          if(res.statusCode === 200){
            if(res.data.code === 0){
              const consultList = res.data.consultList;
              const consultHistory = this.data.dataList;
              for(var i=0; i<consultList.length; i++){
                const{ coun_id, coun_name, begin_time} = consultList[i];
                const std_time = new Date(begin_time);
                const consultRecord = {
                  id : coun_id,
                  name : coun_name,
                  time : std_time.toLocaleDateString(),
                };
                consultHistory.push(consultRecord);
              }
              this.setData({
                dataList : consultHistory,
              })
            }
          }
        }
      })
  }
});