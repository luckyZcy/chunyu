<template>
  <div class="common-wrapped">
    <!-- 搜索框 -->
    <div class="search-wrapped">
      <el-input v-model="state.adminAccount" style="width: 240px" placeholder="输入出库编号进行搜索" :prefix-icon="Search"
        clearable @clear="operation" />
      <el-button type="primary" class="search-button" @click="searchOutWarehouseData">搜索</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="state.tableData" style="width: 100%" border>
      <el-table-column prop="out_number" label="出库编号" />
      <el-table-column prop="out_shuliang" label="出库数量" />
      <el-table-column prop="product_zongjia" label="申请出库总价" />
      <el-table-column prop="applicant" label="申请人" />
      <el-table-column prop="out_applytime" label="申请出库时间" />
      <el-table-column prop="shenheren" label="审核人" />
      <el-table-column prop="out_time" label="出库时间" />
      <el-table-column prop="shenhe_remark" label="审核备注" />
    </el-table>
  </div>
  <!-- 底部 -->
  <div class="table-footer">
    <el-pagination :page-size="state.paginationData.pageSize4" :page-sizes="[5, 30, 100, 400]"
      v-model:current-page="state.paginationData.currentPage" @size-change="sizeChange" @current-change="pageChange"
      layout="total, sizes, prev, pager, next, jumper" :total="state.adminTotal" />
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
import { getProductData, searchOutWarehouse } from '../../../api/login'

const state = reactive({
  adminAccount: '',
  tableData: [
    {
      number: 1,
      status: 0,
    }
  ],
  adminTotal: 0,
  paginationData: {
    pageSize4: 5,
    currentPage: 1,
  },
})
const sizeChange = (number: number) => {
  state.paginationData.pageSize4 = number;
}

const pageChange = (number: number) => {
  state.paginationData.currentPage = number;
}
//获取产品列表
const getProductListData = () => {
  getProductData().then(res => {
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
getProductListData();
// 通过申请出库编号进行搜索
const searchOutWarehouseData = () => {
  searchOutWarehouse({ out_number: state.adminAccount }).then(res => {
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
//清空选择框
const operation = () => {
  getProductListData();
}
</script>
<style lang="scss" scoped>
.common-wrapped {
  padding: 10px 20px;
  background: #fff;
  height: calc(100vh - 101px);

  .search-wrapped {
    margin-bottom: 20px;

    .search-button {
      margin-left: 10px;
    }
  }

}

.table-footer {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}
</style>
