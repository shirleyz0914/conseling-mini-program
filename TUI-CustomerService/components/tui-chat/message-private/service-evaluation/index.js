// eslint-disable-next-line no-undef
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    display: {
      type: Boolean,
      value: '',
      observer(newVal) {
        this.setData({
          displayTag: newVal,
        });
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    displayTag: false,
    scoreList: [1, 2, 3, 4, 5],
    score: 5,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClose() {
      this.triggerEvent('close', {
        key: '2',
      });
    },
    handleScore(e) {
      let { score } = e.currentTarget.dataset;
      if (score === this.data.score) {
        score = 0;
      }
      this.setData({
        score,
      });
    },
    sendMessage() {
      this.triggerEvent('sendCustomMessage', {
        payload: {
          // data 字段作为表示，可以自定义
          data: 'evaluation',
          description: '对咨询师的评价：', // 获取骰子点数
          extension: JSON.stringify({
            score: this.data.score,
          }),
        },
      });
      this.setData({
        score: 0,
      });
      this.handleClose();

      var userID;
      const user_name = wx.getStorage('token').userInfo.userID;
      const counID = 4;
      wx.request({
        url: 'http://1.15.129.51:3000/wx-users/getVisitorInfo',
        method: "GET",
        data: {
          "user_name" :  user_name,
        },
        success: (res) => {
          if(res.statusCode === 200){
            if(res.data.code===0){
                userID = res.data.VisitorInfo.user_id;
            }
          }
          console.log(res);
        }

      })

      wx.request({
        url: 'http://1.15.129.51:3000/wx-users/addFeedbackScore',
        method: "PUT",
        data: {
          "visitor_id": userID,
          "coun_id": counID,
          "score": score,
      },
         success: (res) => {
           if(res.statusCode === 200){
             if(res.data.code === 0){
              wx.showModal({
                title: '感谢您的评价！',
                showCancel: false,
                success: function(res) {
                    wx.switchTab({
                      url: '/pages/Index/index',
                    })
                  }
                })
             }
           }
      },
    })
  },

  pageLifetimes: {
    show() {
      this.setData({
        score: 0,
      });
    },
  }
}
