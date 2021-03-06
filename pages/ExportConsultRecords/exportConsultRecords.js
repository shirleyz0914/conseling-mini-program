const app = getApp()

Page({
  data: {
    visitorName: '',
    dataList: [], // 咨询记录列表  id, name, nick, time
    checkedIds: [], // 选中的id列表,
    checkedAll: false
  },

  checkboxChange(e) { // 复选框change事件
    let id = e.detail.value[0];
    let checkedIds = this.data.checkedIds;
    if (id !== undefined && id !== '') { // 判断是否选中
      checkedIds.push(id);
    } else { // 过滤出选中的复选框
      checkedIds = checkedIds.filter(item => String(item) !== String(e.currentTarget.dataset.id));
    }
    if (checkedIds.length == this.data.dataList.length) { // 调整全选按钮状态
      this.setData({
        checkedIds: checkedIds,
        checkedAll: true
      })
    } else {
      this.setData({
        checkedIds: checkedIds,
        checkedAll: false
      })
    }
    console.log(this.data.checkedIds);
  },
  selectAll(e) { // 全选框
    if (e.detail.value[0] === "all") {
      this.setData({
        checkedIds: this.data.dataList.map(item => item.index),
        dataList: this.data.dataList.map(item => {
          item.checked = true;
          return item;
        })
      })
    } else { // 直接清空列表
      this.setData({
        checkedIds: [],
        dataList: this.data.dataList.map(item => {
          item.checked = false;
          return item;
        })
      });
    }
  },

  onLoad() {
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
            const consultHistory = this.data.dataList;
            for (var i = 0; i < consultList.length; i++) {
              const {
                coun_id,
                uname,
                coun_name,
                begin_time
              } = consultList[i];
              const std_time = new Date(begin_time);
              const consultRecord = {
                index: i,
                id: coun_id,
                name: uname,
                nick: coun_name,
                time: std_time.toLocaleString('chinese', {
                  hour12: false
                }),
                checked: false,
              };
              consultHistory.push(consultRecord);
            }
            this.setData({
              dataList: consultHistory,
            })
          }
        }
      }
    })
  },

  export () {
    const currentCounID = wx.getStorageSync('currentCounID');
    const visitorName = wx.getStorageSync('token').userInfo.userID;
    //console.log("当前选中：");
    for (let i = 0; i < this.data.checkedIds.length; ++i) {
      var that = this;
      (function () {
        var index = that.data.checkedIds[i];
        var curCounID = that.data.dataList[index].name;
        var curConversationID = 'C2C' + curCounID;
        //bug
        let promise = wx.$TUIKit.getMessageList({ //获取选中的record-聊天记录
          conversationID: curConversationID,
          count: 15
        });
        promise.then(function (imResponse) {
          var messages = imResponse.data.messageList; // 消息列表
          var counName = that.data.dataList[index].nick;
          var recordTitle = counName + ' 与 ' + visitorName + ' 的聊天记录';

          var type0;
          switch (messages[0].type) {
            case "TIMTextElem":
              type0 = "[文本]";
              break;
            case "TIMImageElem":
              type0 = "[图片]";
              break;
            case "TIMSoundElem":
              type0 = "[语音]";
              break;
            case "TIMCustomElem":
              type0 = "[评价消息]";
              break;
            case "TIMRelayElem":
              type0 = "[聊天记录]";
              break;
            default:
              type0 = "[消息]";
          }
          var abstract0 = messages[0].nick + ': ' + type0;

          var type1;
          switch (messages[1].type) {
            case "TIMTextElem":
              type1 = "[文本]";
              break;
            case "TIMImageElem":
              type1 = "[图片]";
              break;
            case "TIMSoundElem":
              type1 = "[语音]";
              break;
            case "TIMCustomElem":
              type1 = "[评价消息]";
              break;
            case "TIMRelayElem":
              type1 = "[聊天记录]";
              break;
            default:
              type1 = "[消息]";
          }
          var abstract1 = messages[1].nick + ': ' + type1;


          //console.log(abstract1);
          //console.log(abstract2);
          const record_id = wx.getStorageSync('record_id');
          let mergerMessage = wx.$TUIKit.createMergerMessage({
            to: currentCounID, //咨询师的userID
            conversationType: 'C2C',
            payload: {
              messageList: messages,
              title: recordTitle,
              abstractList: [abstract0, abstract1],
              compatibleText: '请升级IMSDK到v2.10.1或更高版本查看此消息'
            },
            cloudCustomData: `${record_id}`,
          });
          wx.$TUIKit.sendMessage(mergerMessage);
        })
      })();
    }

    wx.showModal({
      title: '转发聊天记录成功！',
      showCancel: false,
      success(res) {
        if (res.confirm) {
          console.log('转发记录完成')
          var payloadData = wx.getStorageSync('payloadData');
          wx.redirectTo({
            url: `../../TUI-CustomerService/pages/TUI-Chat/chat?conversationInfomation=${JSON.stringify(payloadData)}`,
            success: function (e) {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        }
      }
    })
  }

})