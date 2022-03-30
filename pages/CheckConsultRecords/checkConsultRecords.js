const app = getApp()

Page({
  data: {
    dataList:[
      {
        id:"咨询师-1",
        date:"YYYY/MM/DD",
        checked:false
      },
      {
        id:"咨询师-2",
        date:"YYYY/MM/DD",
        checked:false
      },
      {
        id:"咨询师-3",
        date:"YYYY/MM/DD",
        checked:false
      },
      {
        id:"咨询师-4",
        date:"YYYY/MM/DD",
        checked:false
      },
      {
        id:"咨询师-5",
        date:"YYYY/MM/DD",
        checked:false
      },
      {
        id:"咨询师-6",
        date:"YYYY/MM/DD",
        checked:false
      },
      {
        id:"咨询师-7",
        date:"YYYY/MM/DD",
        checked:false
      },
      {
        id:"咨询师-8",
        date:"YYYY/MM/DD",
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
})