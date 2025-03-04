<template>
  <div class="table-wrapped">
    <!-- 顶部 -->
    <div class="table-top">
      <!-- 表格顶部 -->
      <div class="table-header">
        <div class="left-wrapped">
          <!-- 搜索框 -->
          <div class="search-wrapped">
            <el-input v-model="state.adminAccount" class="w-50 m-2" style="width: 220px" placeholder="输入账号进行搜索"
              :prefix-icon="Search" clearable @clear="clearOpenation" />
            <el-button type="primary" class="search-button" @click="searchAdmin">搜索</el-button>
          </div>
          <!-- 搜索框 -->
          <div class="select-wrapped">
            <el-select v-model="state.formData" placeholder="请选择部门" clearable @change="searchDepartment"
              @clear="clearOpenation">
              <el-option v-for="item in state.bumen" :key="item" :label="item.label" :value="item.value" />
              <!-- <el-option label="总裁办" value="总裁办" />
                            <el-option label="项目部" value="项目部" /> -->
            </el-select>
          </div>
        </div>

        <!-- 按钮 -->
        <div class="button-wrapped">
          <el-button plain type="primary" @click="searchUserFreeZe">筛选冻结用户</el-button>
          <el-button type="primary" @click="getTableDataList">显示全部用户</el-button>
        </div>
      </div>
      <!-- 表格内容 -->
      <div class="table-content">
        <el-table :data="state.tableData" style="width: 100%" @row-dblclick="openUser">
          <el-table-column prop="tel" label="账号" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="sex" label="姓别" />
          <el-table-column prop="identity" label="身份" />
          <el-table-column prop="department" label="部门" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="status" label="状态">
            <template #default="{ row }">
              <div>
                <el-tag v-if="row.status == '1'" type="danger">冻结</el-tag>
                <el-tag type="success" v-else>正常</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间">
            <template #default="{ row }">
              <div>{{ row.create_time?.slice(0, 10) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="update_time" label="更新时间">
            <template #default="{ row }">
              <div>{{ row.update_time?.slice(0, 10) }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="160px">
            <template #default="{ row }">
              <div>
                <el-button type="primary" @click="updateUserFreeZe(row)" v-if="row.status == 0">冻结</el-button>
                <el-button type="success" @click="updateUserThaw(row)" v-else>解冻</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 底部 -->
    <div class="table-footer">
      <el-pagination :page-size="state.paginationData.pageSize4" :page-sizes="[15, 30, 100, 400]"
        v-model:current-page="state.paginationData.currentPage" @size-change="sizeChange" @current-change="pageChange"
        layout="total, sizes, prev, pager, next, jumper" :total="state.adminTotal" />
    </div>
  </div>
  <userinfor ref="useri"></userinfor>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { Search } from '@element-plus/icons-vue'
import { bus } from "@/utils/mitt.js"
import userinfor from '../components/user_infor.vue'
import { getTableData, searchAccountData, searchDepartmentData, updateFreeZe, updateThaw, searchFreeZe } from '../../../api/login'
//表格内容
const state = reactive({
  adminAccount: '',
  // JSON.parse(localStorage.getItem('userinfo'))
  tableData: [],
  adminTotal: 0,
  paginationData: {
    pageCount: 1,
    currentPage: 1,
  },
  formData: '',
  bumen: [
    {
      label: '总裁办',
      value: '总裁办',
    }, {
      label: '项目部',
      value: '项目部',
    }, {
      label: '后厨',
      value: '后厨',
    }, {
      label: '研发',
      value: '研发',
    }, {
      label: '食堂',
      value: '食堂',
    }, {
      label: '美甲部',
      value: '美甲部',
    },
  ],
})
const sizeChange = (number: number) => {
  state.paginationData.pageSize4 = number;
}

const pageChange = (number: number) => {
  state.paginationData.currentPage = number;

}
// 取整方法
// paginationData.pageCount=Math.ceil(res.length / 1)
//搜索用户
const searchAdmin = () => {
  searchAccountData({ tel: state.adminAccount }).then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.data,
        type: 'error',
      })
      return;
    }
    state.tableData = res.data;
  })
}
//搜索部门
const searchDepartment = () => {
  searchDepartmentData({ department: state.formData }).then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error',
      })
      return;
    }
    state.tableData = res.data;
  })
}
// 筛选冻结用户
const searchUserFreeZe = () => {
  searchFreeZe({ status: state.tableData }).then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error',
      })
      return;
    }
    state.tableData = res.data;
  })
}


onBeforeUnmount(() => {
  bus.all.clear()
})
const useri = ref()
const openUser = (row: any) => {
  bus.emit('useriId', row)
  useri.value.open()
}
// 冻结用户
const updateUserFreeZe = (info: any) => {
  ElMessageBox.confirm("是否要冻结该用户？", "提示", {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    updateFreeZe({ id: info.id }).then(res => {
      if (res.code != 0) {
        ElMessage({
          message: res.msg,
          type: 'error',
        })
        return;

      }
      getTableDataList();

    })
  }).catch(() => {
  })
}
// 用户解冻
const updateUserThaw = (info: any) => {
  updateThaw({ id: info.id }).then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error',
      })
      return;

    }
    getTableDataList();

  })
}
//获取用户列表
const getTableDataList = () => {
  getTableData(state.adminAccount).then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
      return;
    }
    state.adminTotal = res.data.length;
    state.tableData = res.data;
    // console.log(state.tableData[0].id);

  })
}

getTableDataList();
// 清空选择框
const clearOpenation = () => {
  getTableDataList()
}
</script>
<style lang="scss" scoped>
//用户管理
.table-wrapped {
  padding: 8px;
  height: calc(100vh - 102px);
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .table-top {
    .table-header {
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48px;
      background: #fff;

      .left-wrapped {
        display: flex;

        .search-wrapped {
          margin-right: 24px;
        }
      }
    }
  }

  .table-footer {
    display: flex;
    justify-content: flex-end;
  }
}

.select-wrapped {
  width: 200px;
}

.search-button {
  margin-left: 10px;
  height: 30px;
}

:deep(.el-input__wrapper) {
  padding: 0 15px;
}
</style>
