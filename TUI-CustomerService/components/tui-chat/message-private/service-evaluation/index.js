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
      this.handleClose();

      const counID = wx.getStorageSync('coun_id');
      const userID = wx.getStorageSync('visitor_id');
      const {score} = this.data; //解构score
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
             if(res.data.Code === 0){
               
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
        
    },
  }
},
})

