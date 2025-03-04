<template>
  <div class="common-wrapped">

    <el-table :data="state.tableData" border style="width: 100%">
      <el-table-column prop="message_subject" label="消息主题" />
      <el-table-column prop="leibie" label="类别" />
      <el-table-column prop="publish_bumen" label="发布部门" />
      <el-table-column prop="receive_bumen" label="接收部门" />
      <el-table-column prop="detele_time" label="删除时间" />
      <el-table-column label="操作" width="170px">
        <template #default="scope">
          <el-button type="success" @click="openRecycle(1, scope.row)">还原</el-button>
          <el-button type="danger" @click="openRecycle(2, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 还原信息 -->
  <el-dialog v-model="state.dialogHuanYuan" :title="state.title[state.dialogType]" width="500">
    <div class="text">请慎重操作！您确定要恢复这个公告吗？</div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.dialogHuanYuan = false">取消</el-button>
        <el-button type="primary">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 删除信息 -->
  <!-- <el-dialog v-model="state.dialogDetele" :title="state.title[state.dialogType]" width="500">
        <div class="text">请慎重操作！您确定要真正删除这个公告吗？</div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="state.dialogDetele = false">取消</el-button>
                <el-button type="primary">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog> -->
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getRecycleData, RecycleData, deteleRecycleData } from '../../../api/login'
const state = reactive({
  tableData: [],
  dialogDetele: false,
  dialogHuanYuan: false,
  dialogType: '',
  dialogInfo: {},
  title: ['还原'],
})
//获取消息列表
const getRecycleDataList = () => {
  getRecycleData().then(res => {
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
getRecycleDataList();
//回收站
// const RecycleDataList = () => {
//     if(state.dialogType==1){
//         RecycleData({id:state.dialogInfo}).then(res => {
//         if (res.code != 0) {
//             ElMessage({
//                 message: res.msg,
//                 type: 'error'
//             })
//             return;
//         }
//         ElMessage.success("还原信息成功")
//         state.dialogHuanYuan = false;
//         getRecycleDataList()
//     })
//     }

// }
const openRecycle = (num: number, info: any) => {
  if (num == 2) {
    ElMessageBox.confirm('请慎重操作！您确定要真正删除这个公告吗', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      deteleRecycleData({ id: info.id }).then(res => {
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        getRecycleDataList()
      })
    }).catch(() => {
      ElMessage({
        type: 'info',
        message: '取消了',
      })
    })
  } else if (num == 1) {
    ElMessageBox.confirm('请慎重操作！您确定要恢复这个公告吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      RecycleData({ id: info.id }).then(res => {
        ElMessage({
          type: 'success',
          message: '成功',
        })
        state.tableData = res.data.includes;
        getRecycleDataList()
      })
    }).catch(() => {
      ElMessage({
        type: 'info',
        message: '取消了',
      })
    })
  } else {
    state.dialogType = num;
    state.dialogInfo = info;
    state.dialogDetele = true;
  }
}
</script>
<style lang="scss" scoped>
.common-wrapped {
  padding: 30px 20px 10px;
  background: #fff;
  height: calc(100vh - 101px);

  .select {
    display: flex;
    justify-content: space-between;
    width: 450px;
  }

  .select-wrapped {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .search-button {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;

  }

}
</style>
