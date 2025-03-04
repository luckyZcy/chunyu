<template>
  <div class="common-wrapped">
    <div class="log-wrapped">
      <div class="log-search">
        <el-input v-model="state.SearchOperation" style="width: 240px" placeholder="请输入搜索内容" :prefix-icon="Search"
          clearable @clear="clearOperation" />
        <el-button type="primary" @click="searchOperatorDataList">搜索</el-button>
      </div>
      <el-button type="primary" @click="state.dialogOperationVisible = true">清空操作日志</el-button>
    </div>
    <el-table :data="state.tableData" style="width: 100%">
      <el-table-column prop="operator" label="操作者" />
      <el-table-column prop="operation_content" label="操作内容" />
      <el-table-column prop="operation_level" label="操作等级">
        <template #default="{ row }">
          <el-tag type="primary" v-if="row.operation_level == '0'">低级</el-tag>
          <el-tag type="danger" plain v-else>高级</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operation_time" label="操作时间" />
    </el-table>
  </div>
  <el-dialog v-model="state.dialogOperationVisible" title="清空操作日志" width="500">
    <span>请慎重操作！您确定要清空操作日志吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.dialogOperationVisible = false">取消</el-button>
        <el-button type="primary" @click="deteleOperationlogList">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { Search } from '@element-plus/icons-vue'
import { getOperationlogData, searchOperatorData, deteleOperationlog } from '../../api/login'
const state = reactive({
  tableData: [
    {
      data: '1'
    }
  ],
  SearchOperation: '',
  dialogOperationVisible: false,
})
//获取用户列表
const getOperationlogDataList = () => {
  getOperationlogData().then(res => {
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
getOperationlogDataList();
//通过操作者进行搜索
const searchOperatorDataList = () => {
  searchOperatorData({ operator: state.SearchOperation }).then(res => {
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
//清空操作日志
const deteleOperationlogList = () => {
  deteleOperationlog().then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
      return;
    }
    state.tableData = res.data.records;
    state.dialogOperationVisible = false;

  })
  getOperationlogDataList()
}
const clearOperation = () => {
  getOperationlogDataList()
}
</script>
<style lang="scss" scoped>
.common-wrapped {
  padding: 30px 20px 10px;
  background: #fff;
  height: calc(100vh - 101px);

  .log-wrapped {
    height: 32px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .log-search {
    width: 310px;
    display: flex;
    justify-content: space-between;

  }
}
</style>
