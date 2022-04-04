const app = getApp()

Page({
  data: {
    dataList:[], // 咨询记录列表
    checkedIds:[], // 选中的id列表,
    checkedAll:false
  },
  checkboxChange(e) { // 复选框change事件
    let id = e.detail.value[0];
    let checkedIds = this.data.checkedIds;
    if (id !==undefined && id !=='') { // 判断是否选中
      checkedIds.push(id);
    }else { // 过滤出选中的复选框
      checkedIds = checkedIds.filter(item=>String(item)!==String(e.currentTarget.dataset.id));
    }
    if (checkedIds.length == this.data.dataList.length) { // 调整全选按钮状态
      this.setData({
        checkedIds:checkedIds,
        checkedAll:true
      })
    }else {
      this.setData({
        checkedIds:checkedIds,
        checkedAll:false
      })
    }
    console.log(this.data.checkedIds);
  },
  selectAll(e){ // 全选框
    if (e.detail.value[0] ==="all") {
      this.setData({
        checkedIds:this.data.dataList.map(item=>item.id),
        dataList:this.data.dataList.map(item=>{item.checked = true;return item;})
      })
    }else { // 直接清空列表
      this.setData({
        checkedIds:[],
        dataList:this.data.dataList.map(item=>{item.checked = false;return item;})
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
                  checked : false,
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

})