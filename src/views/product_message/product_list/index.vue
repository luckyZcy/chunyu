<template>
  <div class="common-wrapped">
    <el-tabs v-model="state.activeName" class="demo-tabs">
      <el-tab-pane label="产品列表" name="first">
        <!-- 搜索框 -->
        <div class="search-wrapped">
          <div class="sousuo">
            <el-input v-model="state.adminAccount" style="width: 240px" placeholder="输入入库编号进行搜索" :prefix-icon="Search"
              clearable @clear="clearOpenation" />
            <el-button type="primary" class="search-button" @click="searchEnterHouse">搜索</el-button>
          </div>
          <el-button type="primary" class="search-button" @click="openProductDialog(0, {})">添加产品</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="state.tableData" style="width: 100%" border>
          <el-table-column prop="enter_number" label="入库编号" />
          <el-table-column prop="name" label="产品名称" />
          <el-table-column prop="product_lei" label="产品类别" />
          <el-table-column prop="danwei" label="单位" />
          <el-table-column prop="kucunshu" label="库存数量" />
          <el-table-column prop="product_danjia" label="产品单价" />
          <el-table-column prop="status" label="库存状态">
            <template #default="{ row }">
              <div>
                <el-tag v-if="row.kucunshu < 100" type="danger">库存过少</el-tag>
                <el-tag type="primary" v-else-if="row.kucunshu >= 100 && row.kucunshu < 300">库存正常</el-tag>
                <el-tag type="success" v-else-if="row.kucunshu >= 300">库存过剩</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="enter_fuzeren" label="入库负责人" />
          <el-table-column prop="enter_time" label="入库时间">
            <template #default="{ row }">
              <div>{{ row.enter_time?.slice(0, 10) }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="270px">
            <template #default="scope">
              <el-button type="primary" @click="openProductDialog(4, scope.row)">申请出库</el-button>
              <!-- <el-button type="primary" @click="state.dialogOutbound = true">申请出库</el-button> -->
              <el-button type="success" @click="openProductDialog(1, scope.row)">修改</el-button>
              <el-button type="danger" @click="openProductDialog(2, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>
      <el-tab-pane label="审核列表" name="second">
        <!-- 搜索框 -->
        <div class="search-wrapped">
          <div class="sousuo">
            <el-input v-model="state.adminAccount" style="width: 240px" placeholder="输入申请出库编号进行搜索" :prefix-icon="Search"
              clearable @clear="clearOpenation" />
            <el-button type="primary" class="search-button" @click="searchApplyWarehouseData">搜索</el-button>
          </div>
        </div>
        <!-- 表格 -->
        <el-table :data="state.tableData" style="width: 100%" border>
          <el-table-column prop="shenqing_number" label="申请出库编号" />
          <el-table-column prop="name" label="产品名称" />
          <el-table-column prop="out_shuliang" label="出库数量" />
          <el-table-column prop="product_zongjia" label="申请出库总价" />
          <el-table-column prop="applicant" label="申请人" />
          <el-table-column prop="shenheren" label="审核人" />
          <el-table-column prop="shenhe_status" label="审核状态">
            <template #default="{ row }">
              <div>
                <el-tag type="primary" v-if="row.shenhe_status == '1'">申请出库</el-tag>
                <el-tag type="danger" v-else-if="row.shenhe_status == '2'">未申请</el-tag>
                <el-tag type="success" v-else-if="row.shenhe_status == '0'">已出库</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="out_time" label="出库时间">
            <template #default="{ row }">
              <div>{{ row.out_time?.slice(0, 10) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="shenqing_remark" label="申请出库备注" />
          <el-table-column prop="shenhe_remark" label="审核备注" />
          <el-table-column label="操作" width="300px">
            <template #default="scope">
              <el-button type="primary" @click="openProductDialog(6, scope.row)">撤回申请</el-button>
              <el-button type="success" @click="openProductDialog(7, scope.row)">再次申请</el-button>
              <el-button type="danger" @click="openProductDialog(8, scope.row)">审核</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
  <!-- 底部 -->
  <div class="table-footer">
    <el-pagination :page-size="state.paginationData.pageSize4" :page-sizes="[15, 30, 100, 400]"
      v-model:current-page="state.paginationData.currentPage" @size-change="sizeChange" @current-change="pageChange"
      layout="total, sizes, prev, pager, next, jumper" :total="state.adminTotal" />
  </div>
  <!-- 添加产品弹窗 -->
  <el-dialog v-model="state.dialogGoodsVisible" :title="state.title[state.dialogType]" width="500" align-center>
    <el-form ref="ruleFormRef" :model="state.dialogInfo" :rules="state.rules" label-width="100px">
      <el-form-item label="入库编号" prop="enter_number">
        <el-input v-model="state.dialogInfo.enter_number" style="width: 240px" :disabled="state.dialogType == 1" />
      </el-form-item>
      <el-form-item label="产品名称" prop="name">
        <el-input v-model="state.dialogInfo.name" style="width: 240px" />
      </el-form-item>
      <el-form-item label="产品类别" prop="product_lei">
        <el-select v-model="state.dialogInfo.product_lei" placeholder="请选择产品类别" style="width: 240px">
          <el-option label="家具类" value="家具类" />
          <el-option label="生活用品" value="生活用品" />
          <el-option label="家用电器类" value="家用电器类" />
          <el-option label="通讯类" value="通讯类" />
          <el-option label="食品类" value="食品类" />
          <el-option label="玩具类" value="玩具类" />
        </el-select>
      </el-form-item>
      <el-form-item label="单位" prop="danwei">
        <el-select v-model="state.dialogInfo.danwei" placeholder="请选择产品单位" style="width: 240px">
          <el-option label="套" value="套" />
          <el-option label="个" value="个" />
          <el-option label="袋" value="袋" />
        </el-select>
      </el-form-item>
      <el-form-item label="库存数量" prop="kucunshu">
        <el-input v-model="state.dialogInfo.kucunshu" style="width: 240px" />
      </el-form-item>
      <el-form-item label="库存状态" prop="status">
        <el-input v-model="state.dialogInfo.status" style="width: 240px" />
      </el-form-item>
      <el-form-item label="产品单价" prop="product_danjia">
        <el-input v-model="state.dialogInfo.product_danjia" style="width: 240px" />
      </el-form-item>
      <el-form-item label="入库负责人" prop="enter_fuzeren">
        <el-input v-model="state.dialogInfo.enter_fuzeren" style="width: 240px" :disabled="state.dialogType == 1" />
      </el-form-item>
      <el-form-item label="入库备注" prop="enter_remark">
        <el-input v-model="state.dialogInfo.enter_remark" style="width: 240px" :rows="2" type="textarea" />
      </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.dialogGoodsVisible = false">取消</el-button>
        <el-button type="primary" @click="CommonDialog">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 申请出库 -->
  <el-dialog v-model="state.dialogOutbound" title="申请出库" width="500">
    <el-form ref="ruleFormRef" :model="state.dialogInfo" :rules="state.rules" label-width="120px">
      <div class="product_name">您申请出库的产品是：{{ state.dialogInfo.name }}</div>
      <el-form-item label="申请出库编号" prop="shenqing_number">
        <el-input v-model="state.dialogInfo.shenqing_number" style="width: 240px" />
      </el-form-item>
      <el-form-item label="出库数量" prop="out_shuliang">
        <el-input v-model="state.dialogInfo.out_shuliang" style="width: 240px" />
      </el-form-item>
      <el-form-item label="出库申请人" prop="applicant">
        <el-input v-model="state.dialogInfo.applicant" style="width: 240px" />
      </el-form-item>
      <el-form-item label="申请备注" prop="shenqing_remark">
        <el-input v-model="state.dialogInfo.shenqing_remark" style="width: 240px" :rows="2" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.dialogOutbound = false">取消</el-button>
        <el-button type="primary" @click="updateWarehouseTable">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 审核 -->
  <el-dialog v-model="state.dialogShenHe" title="审核产品" width="500">
    <div class="text">确定审核此产品的出库吗?</div>
    <div class="xuanze">
      <el-radio-group v-model="state.radio">
        <el-radio :value="3">同意</el-radio>
        <el-radio :value="6">禁止</el-radio>
      </el-radio-group>
    </div>
    <el-form ref="ruleFormRef" :model="state.dialogInfo">
      <el-form-item prop="shenhe_remark">
        <el-input v-model="state.dialogInfo.shenhe_remark" style="width: 300px" :rows="2" type="textarea"
          placeholder="请输入审核备注" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.dialogShenHe = false">取消</el-button>
        <el-button type="primary">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 撤回申请 -->
  <el-dialog v-model="state.dialogShenQing" title="撤回提醒" width="500">
    <div class="text">确定取消此产品的出库申请吗?</div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.dialogShenQing = false">取消</el-button>
        <el-button type="primary" @click="WithdrawDataTable">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 再次申请 -->
  <el-dialog v-model="state.dialogOnceShenQing" title="再次申请出库" width="500">
    <div class="text">请确认,此操作将再次申请产品入库</div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.dialogOnceShenQing = false">取消</el-button>
        <el-button type="primary" @click="ReWithdrawDataTable">
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
import { getProductData, updateProductNews, searchApplyWarehouse, updateEditProduct, updateWarehouse, deleteProduct, searchWarehouseData, WithdrawData, ReWithdrawData } from '../../../api/login'
const state = reactive({
  activeName: 'first',
  radio: '',
  adminAccount: '',
  tableData: [
    {
      number: 1,
      status: 0,
    }
  ],
  adminTotal: 0,
  paginationData: {
    pageSize4: 15,
    currentPage: 1,
  },
  dialogGoodsVisible: false,
  dialogOutbound: false,
  rules: {
    enter_number: [
      { required: true, message: '请输入入库编号', trigger: 'blur' },
    ],
    name: [
      { required: true, message: '请输入产品名称', trigger: 'blur' },
    ],
    product_lei: [
      { required: true, message: '请输入产品类别', trigger: 'blur' },
    ],
    danwei: [
      { required: true, message: '请输入产品单位', trigger: 'blur' },
    ],
    kucunshu: [
      { required: true, message: '请输入库存数量', trigger: 'blur' },
    ],
    product_danjia: [
      { required: true, message: '请输入产品单价', trigger: 'blur' },
    ],
    enter_fuzeren: [
      { required: true, message: '请输入入库负责人', trigger: 'blur' },
    ],
    status: [
      { required: true, message: '请输入库存状态', trigger: 'blur' },
    ],
    shenqing_number: [
      { required: true, message: '请输入申请出库编号', trigger: 'blur' },
    ],
    out_shuliang: [
      { required: true, message: '请输入出库数量', trigger: 'blur' },
    ],
    applicant: [
      { required: true, message: '请输入申请人', trigger: 'blur' },
    ],
  },
  textarea: '',
  dialogType: 0,
  dialogInfo: {},
  title: ['添加', '编辑'],

})
const sizeChange = (number: number) => {
  state.paginationData.pageSize4 = number;
}

const pageChange = (number: number) => {
  state.paginationData.currentPage = number;

}
const CommonDialog = () => {
  if (state.dialogType == 0) {
    updateProductNews(state.dialogInfo).then(res => {
      if (res.code != 0) {
        ElMessage({
          message: res.msg,
          type: 'error'
        })
        return;
      }
      ElMessage.success("添加产品信息成功")
      state.dialogGoodsVisible = false;
      getProductListData();

    })
  } else if (state.dialogType == 1) {
    updateEditProduct(state.dialogInfo).then(res => {
      if (res.code != 0) {
        ElMessage({
          message: res.msg,
          type: 'error'
        })
        return;
      }
      ElMessage.success("编辑产品信息成功")
      state.dialogGoodsVisible = false;
      getProductListData();

    })
  }
}
const openProductDialog = (num: number, info: any) => {
  if (num == 2) {
    ElMessageBox.confirm('请慎重操作,删除后将失去此产品的记录', '删除操作', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      deleteProduct({ id: info.id }).then(res => {
        ElMessage({
          type: 'success',
          message: '产品记录删除成功',
        })
        getProductListData();
      })
    }).catch(() => {
      ElMessage({
        type: 'info',
        message: '取消操作',
      })
    })

  } else if (num == 4) {
    state.dialogOutbound = true;
    state.dialogInfo = info;
  } else if (num == 6) {
    state.dialogShenQing = true;
    state.dialogInfo = info;
  } else if (num == 7) {
    state.dialogOnceShenQing = true;
    state.dialogInfo = info;
  } else {
    state.dialogType = num;
    state.dialogInfo = info;
    state.dialogGoodsVisible = true;
  }
}
// 通过入库编号进行搜索
const searchEnterHouse = () => {
  searchWarehouseData({ enter_number: state.adminAccount }).then(res => {
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
// 通过申请出库编号进行搜索
const searchApplyWarehouseData = () => {
  searchApplyWarehouse({ shenqing_number: state.adminAccount }).then(res => {
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
//申请出库
const updateWarehouseTable = () => {
  updateWarehouse(state.dialogInfo).then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
      return;
    }
    ElMessage.success("申请出库成功")
    state.dialogOutbound = false;
    getProductListData();

  })
}
// 撤回申请
const WithdrawDataTable = () => {
  WithdrawData(state.dialogInfo).then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
      return;
    }
    ElMessage.success("撤回申请成功")
    state.dialogShenQing = false;
    getProductListData();

  })
}
// 再次申请
const ReWithdrawDataTable = () => {
  ReWithdrawData(state.dialogInfo).then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
      return;
    }
    ElMessage.success("再次申请成功")
    state.dialogOnceShenQing = false;
    getProductListData();

  })
}
// 清空选择框
const clearOpenation = () => {
  getProductListData()
}
</script>
<style lang="scss" scoped>
.common-wrapped {
  padding: 10px 20px;
  background: #fff;
  height: calc(100vh - 101px);

  .search-wrapped {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .sousuo {
      width: 310px;
      display: flex;
      justify-content: space-between;

    }
  }

}

.product_name {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  font-weight: 600;
}

.table-footer {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}

.text {
  margin-bottom: 10px;
  font-size: 16px;
}

.xuanze {
  margin-bottom: 10px;

}
</style>
