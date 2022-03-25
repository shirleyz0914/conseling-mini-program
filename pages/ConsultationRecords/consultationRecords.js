const app = getApp()

Page({
  data: {
    dataList:[
      {
        id:"咨询师-1",
        checked:false
      },
      {
        id:"咨询师-2",
        checked:false
      },
      {
        id:"咨询师-3",
        checked:false
      },
      {
        id:"咨询师-4",
        checked:false
      },
      {
        id:"咨询师-5",
        checked:false
      },
      {
        id:"咨询师-6",
        checked:false
      },
      {
        id:"咨询师-7",
        checked:false
      },
      {
        id:"咨询师-8",
        checked:false
      },
    ], // 数据列表
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
  }

})