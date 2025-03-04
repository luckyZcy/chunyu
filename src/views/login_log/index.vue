<template>
  <div class="common-wrapped">
    <div class="log-wrapped">
      <div class="log-search">
        <el-input v-model="state.SearchLogin" placeholder="请输入搜索内容" style="width: 240px" :prefix-icon="Search" clearable
          @clear="clearOperation" />
        <el-button type="primary" @click="searchAccountList">搜索</el-button>
      </div>
      <el-button type="primary" @click="state.dialogLoginVisible = true">清空登录日志</el-button>
    </div>
    <el-table :data="state.tableData" style="width: 100%">
      <el-table-column prop="login_account" label="登录账号" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="link" label="联系方式" />
      <el-table-column prop="login_time" label="登录时间" />
    </el-table>
  </div>
  <el-dialog v-model="state.dialogLoginVisible" title="清空登录日志" width="500">
    <span>请慎重操作！您确定要清空登录日志吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.dialogLoginVisible = false">取消</el-button>
        <el-button type="primary" @click="deteleJournalDataList">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { getJournalData, searchAccount, deteleJournalData } from '../../api/login'
const state = reactive({
  tableData: [
    {
      data: '1'
    }
  ],
  SearchLogin: '',
  dialogLoginVisible: false,
})
//通过账号进行搜索
const searchAccountList = () => {
  searchAccount({ login_account: state.SearchLogin }).then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
      return;
    }
    state.tableData = res.data;
  })
}
//获取用户列表
const getJournalDataList = () => {
  getJournalData().then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
      return;
    }
    state.tableData = res.data;

  })
}
//清空登录日志
const deteleJournalDataList = () => {
  deteleJournalData().then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
      return;
    }
    state.tableData = res.data.records;
    state.dialogLoginVisible = false;

  })
  getJournalDataList()
}
getJournalDataList();
//清空选择框
const clearOperation = () => {
  getJournalDataList();
}

</script>
<style lang="scss" scoped>
.common-wrapped {
  padding: 30px 20px 10px;
  background: #fff;
  height: calc(100vh - 101px);

  .log-wrapped {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .log-search {
      width: 310px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
