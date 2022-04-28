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
    comment: '',
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
      let {
        score
      } = e.currentTarget.dataset;
      if (score === this.data.score) {
        score = 0;
      }
      this.setData({
        score,
      });
    },
    bindTextAreaInput(e) {
      this.setData({
        comment: e.detail.value,
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
            comment: this.data.comment,
          }),
        },
      });
      this.handleClose();

      //从缓存找到数据
      const counID = wx.getStorageSync('coun_id');
      const userID = wx.getStorageSync('visitor_id');
      const record_id = wx.getStorageSync('record_id');
      const {
        score,
        comment
      } = this.data; //解构score
      wx.request({
        url: 'http://1.15.129.51:3000/wx-users/addFeedbackScore',
        method: "PUT",
        data: {
          "visitor_id": userID,
          "coun_id": counID,
          "score": score,
          "record_id": record_id,
          "vis_to_coun_comment": comment,
        },
        success: (res) => {
          if (res.statusCode === 200) {
            if (res.data.Code === 0) {
              wx.removeStorageSync('coun_id');
              wx.removeStorageSync('begin_time')
              wx.showModal({
                title: '感谢您的评价！',
                showCancel: false,
                success: function (res) {
                  wx.switchTab({
                    url: '/pages/Index/index',
                    success: function (e) {
                      var page = getCurrentPages().pop();
                      if (page == undefined || page == null) return;
                      page.onLoad();                    
                    }
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