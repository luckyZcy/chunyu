<template>
  <div class="table-wrapped">
    <!-- 顶部 -->
    <div class="table-top">
      <!-- 表格顶部 -->
      <div class="table-header">
        <!-- 搜索框 -->
        <div class="search-wrapped">
          <el-input v-model="state.adminAccount" class="w-50 m-2" style="width: 220px" placeholder="输入账号进行搜索"
            :prefix-icon="Search" clearable @clear="clearOpenation" />
          <el-button type="primary" class="search-button" @click="searchAdmin">搜索</el-button>
          <!-- @change="searchAdmin" -->
        </div>
        <div class="button-wrapped">
          <el-button type="primary" @click="openDialog(0, {})">添加用户管理员</el-button>
        </div>
      </div>
      <!-- 表格内容 -->
      <div class="table-content">
        <el-table :data="state.tableData" style="width: 100%">
          <el-table-column prop="tel" label="账号" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="sex" label="姓别" />
          <el-table-column prop="department" label="部门" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="update_time" label="更新时间" />
          <el-table-column label="操作" width="160px">
            <template #default="scope">
              <el-button type="success" @click="openDialog(1, scope.row)">编辑</el-button>
              <el-button type="danger" @click="openDialog(2, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 底部 -->
    <div class="table-footer">
      <el-pagination :page-size="state.paginationData.pageSize4" :page-sizes="[5, 30, 100, 400]"
        v-model:current-page="state.paginationData.currentPage" @size-change="sizeChange" @current-change="pageChange"
        layout="total, sizes, prev, pager, next, jumper" :total="state.adminTotal" />
    </div>
  </div>
  <el-dialog v-model="state.diagoVisible" :title='state.title[state.dialogType]' width="500px">
    <el-form ref="ruleFormRef" :model="state.dialogInfo" :rules="state.rules" label-width="100px">
      <el-form-item label="账号" prop="tel">
        <el-input v-model="state.dialogInfo.tel" :disabled="state.dialogType == 1" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="state.dialogInfo.name" />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="state.dialogInfo.sex" placeholder="请选择性别">
          <el-option v-for="item in state.sexList" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="state.dialogInfo.email" />
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-select v-model="state.dialogInfo.department" placeholder="请选择部门">
          <el-option v-for="item in state.bumen" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.diagoVisible = false">取消</el-button>
        <el-button type="primary" @click="submitHttp">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { getTableData, searchAccountData, updateEditManager, updateProductManager, getPagingData } from '../../../api/login'

//分页
const state = reactive({
  paginationData: {
    pageSize4: 5,
    currentPage: 1,
  },
  rules: {
    tel: [
      { required: true, message: '请输入管理员的注册账号', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入管理员的注册密码', trigger: 'blur' },
    ],
    name: [
      { required: true, message: '请输入管理员的用户名', trigger: 'blur' },
    ],
    sex: [
      { required: true, message: '请选择管理员的性别', trigger: 'blur' },
    ],
    email: [
      { required: true, message: '请输入管理员的注册邮箱', trigger: 'blur' },
    ],
    department: [
      { required: true, message: '请选择管理员的注册部门', trigger: 'blur' },
    ],
  },
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
      label: '研发部',
      value: '研发部',
    }, {
      label: '食堂',
      value: '食堂',
    }, {
      label: '美甲部',
      value: '美甲部',
    },
  ],
  sexList: [
    {
      label: '男',
      value: '男',
    }, {
      label: '女',
      value: '女',
    }
  ],
  title: ['添加', '编辑'],
  dialogType: 0,
  dialogInfo: {},
  adminTotal: 0,//数据总数
  adminAccount: '',
  diagoVisible: false,
  tableData: [],
})
//分页
const getPagingDataList = () => {
  getPagingData({ size: state.paginationData.pageSize4, page: state.paginationData.currentPage }).then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.data,
        type: 'error'
      })
      return;
    }
    state.tableData = res.data.list;
    state.adminTotal = res.data.total;
  })
}
getPagingDataList();
//搜索用户
const searchAdmin = () => {
  searchAccountData({ tel: state.adminAccount }).then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.data,
        type: 'error'
      })
      return;
    }
    state.tableData = res.data;

  })
}

const submitHttp = () => {
  if (state.dialogType == 1) { //编辑
    updateEditManager(state.dialogInfo).then(res => {
      if (res.code != 0) {
        ElMessage({
          message: res.msg,
          type: 'error'
        })
        return;
      }
      ElMessage.success("编辑管理员信息成功")
      state.diagoVisible = false;
      getTableDataList();

    })
  } else if (state.dialogType == 0) { //添加创建
    updateProductManager(state.dialogInfo).then(res => {
      if (res.code != 0) {
        ElMessage({
          message: res.msg,
          type: 'error'
        })
        return;
      }
      ElMessage.success("添加用户管理员成功")
      state.diagoVisible = false;
      getTableDataList();

    })
  }
}

const openDialog = (num: number, info: any) => {
  if (num == 2) {
    ElMessageBox.confirm('是否去掉此用户的管理员职位？删除后此用户将重新展示在用户列表中', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '不删除',
      type: 'warning',
    }).then(() => {
      console.log(info)
      // deleteInfo({id:info.id}).then(res=>{
      //     ElMessage({
      //         type: 'success',
      //         message: '删除成功',
      //     })
      // })
    }).catch(() => {
      ElMessage({
        type: 'info',
        message: '取消了',
      })
    })
  } else {
    state.dialogType = num;
    state.dialogInfo = info;
    state.diagoVisible = true;
  }
}

const sizeChange = (number: number) => {
  state.paginationData.pageSize4 = number;
  getPagingDataList();

}

const pageChange = (number: number) => {
  state.paginationData.currentPage = number;
  getPagingDataList();


}

//获取用户列表
const getTableDataList = () => {
  getTableData(state.adminAccount).then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.data,
        type: 'error'
      })
      return;
    }
    state.adminTotal = res.data.length;
    state.tableData = res.data;
    getPagingDataList();

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
    }
  }

  .table-footer {
    display: flex;
    justify-content: flex-end;
  }
}

.search-button {
  margin-left: 10px;
  height: 30px;
}

:deep(.el-input__wrapper) {
  padding: 0 15px;
}
</style>
