<template>
  <div class="common-wrapped">
    <el-tabs v-model="state.activeName" class="demo-tabs">
      <el-tab-pane label="公告管理" name="first">
        <!-- 搜索框 -->
        <div class="select-wrapped">
          <div class="select">
            <el-select v-model="state.formData" placeholder="选择部门进行筛选" style="width: 240px;height: 32px;"
              @change="getPublishDataList" clearable @clear="clearOpenation">
              <el-option v-for="item in state.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-radio-group v-model="state.radio" size="small" @change="getPublishMessageList">
              <el-radio value="一般">一般</el-radio>
              <el-radio value="重要">重要</el-radio>
              <el-radio value="必要">必要</el-radio>
            </el-radio-group>
          </div>
          <!-- 按钮 -->
          <div>
            <el-button type="primary" plain @click="getMessageListData">全部公告</el-button>
            <el-button type="primary" @click="openMessageDialog(0, {})">发布公告</el-button>
          </div>
        </div>
        <!-- 公告管理表格 -->
        <el-table :data="state.tableData" border style="width: 100%">
          <el-table-column prop="notice_content" label="公告主题" />
          <el-table-column prop="leibie" label="类别" />
          <el-table-column prop="publish_bumen" label="发布部门" />
          <el-table-column prop="publisher" label="发布人" />
          <el-table-column prop="receive_bumen" label="接收部门" />
          <el-table-column prop="notice_dengji" label="公告等级" />
          <el-table-column prop="publish_time" label="发布时间">
            <template #default="{ row }">
              <div>{{ row.publish_time?.slice(0, 10) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="edit_time" label="最新编辑时间" width="110px">
            <template #default="{ row }">
              <div>{{ row.edit_time?.slice(0, 10) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="readers" label="阅读人数" />
          <el-table-column label="操作" width="170px">
            <template #default="scope">
              <el-button type="success" @click="openMessageDialog(1, scope.row)">编辑</el-button>
              <el-button type="danger" @click="openMessageDialog(2, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="系统消息" name="second">
        <div class="search-button">
          <el-button type="primary" @click="state.dialogSystemMessage = true">发布系统消息</el-button>
        </div>
        <!-- 系统消息表格 -->
        <el-table :data="state.tableData" border style="width: 100%">
          <el-table-column prop="message_subject" label="消息主题" />
          <el-table-column prop="publisher" label="发布者" />
          <el-table-column prop="readers" label="阅读人数" />
          <el-table-column prop="publish_time" label="发布时间" />
          <el-table-column label="操作" width="170px">
            <template #default="scope">
              <el-button type="success" @click="state.dialogEditSystemMessage = true">编辑</el-button>
              <el-button type="danger" @click="openMessageDialog(3, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
  <!-- 底部 -->
  <!-- <div class="table-footer">
        <el-pagination :page-size="state.paginationData.pageSize4" :page-sizes="[15, 30, 100, 400]"
            v-model:current-page="state.paginationData.currentPage" @size-change="sizeChange"
            @current-change="pageChange" layout="total, sizes, prev, pager, next, jumper" :total="state.adminTotal" />
    </div> -->
  <!-- 发布公告 -->
  <el-dialog v-model="state.dialogPublishNotice" :title="state.title[state.dialogType]" width="500">
    <el-form ref="ruleFormRef" :model="state.dialogInfo" label-width="100px" :rules="state.rules">
      <el-form-item label="主题" prop="notice_content" placeholder="请输入主题">
        <el-input v-model="state.dialogInfo.notice_content" style="width: 240px" />
      </el-form-item>
      <el-form-item label="发布部门" prop="publish_bumen">
        <el-select v-model="state.dialogInfo.publish_bumen" placeholder="请选择发布部门" style="width: 240px;height: 32px;">
          <el-option v-for="item in state.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="发布人" prop="publisher" placeholder="请输入发布人">
        <el-input v-model="state.dialogInfo.publisher" style="width: 240px" />
      </el-form-item>
      <el-form-item label="消息类别" prop="leibie">
        <el-select v-model="state.dialogInfo.leibie" placeholder="请选择消息类别" style="width: 240px"
          :disabled="state.dialogType == 1">
          <el-option v-for="item in state.leibie" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="接收部门" prop="receive_bumen">
        <el-select v-model="state.dialogInfo.receive_bumen" placeholder="请选择接收部门" style="width: 240px">
          <el-option v-for="item in state.receive" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="公告等级" prop="notice_dengji">
        <el-select v-model="state.dialogInfo.notice_dengji" placeholder="请选择公告等级" style="width: 240px">
          <el-option v-for="item in state.level" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="阅读人数" prop="readers" placeholder="请输入发布人">
        <el-input v-model="state.dialogInfo.readers" style="width: 240px" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="state.dialogInfo.content" style="width: 240px" :rows="2" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.dialogPublishNotice = false">取消</el-button>
        <el-button type="primary" @click="CommonDialog">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 发布系统消息弹窗 -->
  <el-dialog v-model="state.dialogSystemMessage" title="公司公告" width="500">
    <el-form :model="state.dialogInfo" label-width="100px" :rules="state.rules">
      <el-form-item label="主题" prop="notice_content" placeholder="请输入主题">
        <el-input v-model="state.dialogInfo.notice_content" style="width: 240px" />
      </el-form-item>
      <el-form-item label="发布人" prop="publisher" placeholder="请输入发布人">
        <el-input v-model="state.dialogInfo.publisher" style="width: 240px" />
      </el-form-item>
      <el-form-item label="消息类别" prop="leibie">
        <el-select v-model="state.dialogInfo.leibie" placeholder="请选择消息类别" style="width: 240px">
          <el-option label="知照" value="知照" />
          <el-option label="任免" value="任免" />
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="state.dialogInfo.content" style="width: 240px" :rows="2" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.dialogSystemMessage = false">取消</el-button>
        <el-button type="primary" @click="state.dialogSystemMessage = false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 系统消息编辑弹窗 -->
  <el-dialog title="编辑系统消息" v-model="state.dialogEditSystemMessage" width="500">
    <el-form ref="ruleFormRef" :model="state.tableData" label-width="100px" :rules="state.editrules">
      <el-form-item label="主题" prop="message_subject" placeholder="请输入主题">
        <el-input v-model="state.tableData.message_subject" style="width: 240px" />
      </el-form-item>
      <el-form-item label="发布人" prop="publisher" placeholder="请输入发布人">
        <el-input v-model="state.tableData.publisher" style="width: 240px" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="state.tableData.content" style="width: 240px" :rows="2" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.dialogEditSystemMessage = false">取消</el-button>
        <el-button type="primary">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getMessageData, updateNoticeNews, updateEditNotice, getPublishData, getPublishMessage, deleteMessage } from '../../../api/login'
const state = reactive({
  activeName: 'first',
  options: [
    {
      label: '总裁办',
      value: '总裁办',
    }, {
      label: '项目部',
      value: '项目部',
    }, {
      label: '研发部',
      value: '研发部',
    }, {
      label: '食堂',
      value: '食堂',
    }, {
      label: '销售部',
      value: '销售部',
    },
    {
      label: '董事会',
      value: '董事会',
    },
  ],
  receive: [{
    label: '总裁办',
    value: '总裁办',
  }, {
    label: '项目部',
    value: '项目部',
  }, {
    label: '研发部',
    value: '研发部',
  }, {
    label: '食堂',
    value: '食堂',
  }, {
    label: '销售部',
    value: '销售部',
  },
  {
    label: '董事会',
    value: '董事会',
  },
  {
    label: '全体成员',
    value: '全体成员',
  },
  ],
  leibie: [
    {
      label: '部门公告',
      value: '部门公告',
    },
    {
      label: '公司公告',
      value: '公司公告',
    },
  ],
  level: [
    {
      label: '一般',
      value: '一般',
    },
    {
      label: '重要',
      value: '重要',
    },
    {
      label: '必要',
      value: '必要',
    },
  ],
  tableData: [],
  radio: '',
  paginationData: {
    pageSize4: 15,
    currentPage: 1,
  },
  dialogPublishNotice: false,
  dialogSystemMessage: false,
  dialogEditSystemMessage: false,
  rules: {
    notice_content: [
      { required: true, message: '请输入公告主题', trigger: 'blur' },
    ],
    publish_bumen: [
      { required: true, message: '请输入发布部门', trigger: 'blur' },
    ],
    publisher: [
      { required: true, message: '请输入发布人', trigger: 'blur' },
    ],
    receive_bumen: [
      { required: true, message: '请输入接收部门', trigger: 'blur' },
    ],
    notice_dengji: [
      { required: true, message: '请输入公告等级', trigger: 'blur' },
    ],
    enter_remark: [
      { required: true, message: '请输入内容', trigger: 'blur' },
    ],
    readers: [
      { required: true, message: '请输入内容', trigger: 'blur' },
    ],
  },
  editrules: {
    notice_content: [
      { required: true, message: '请输入公告主题', trigger: 'blur' },
    ],
    publisher: [
      { required: true, message: '请输入发布人', trigger: 'blur' },
    ],
    content: [
      { required: true, message: '请输入发布人', trigger: 'blur' },
    ],
  },
  textarea: '',
  dialogType: 0,
  dialogInfo: {},
  title: ['添加', '编辑'],
  FormData: '',
})
// const sizeChange = (number: number) => {
//     state.paginationData.pageSize4 = number;
// }

// const pageChange = (number: number) => {
//     state.paginationData.currentPage = number;

// }
// updateSystemMessage
//添加和编辑
const CommonDialog = () => {
  if (state.dialogType == 0) {
    updateNoticeNews(state.dialogInfo).then(res => {
      if (res.code != 0) {
        ElMessage({
          message: res.msg,
          type: 'error'
        })
        return;
      }
      ElMessage.success("添加公告信息成功")
      state.dialogPublishNotice = false;
      getMessageListData();

    })
  } else if (state.dialogType == 1) {
    updateEditNotice(state.dialogInfo).then(res => {
      if (res.code != 0) {
        ElMessage({
          message: res.msg,
          type: 'error'
        })
        return;
      }
      ElMessage.success("编辑公告信息成功")
      state.dialogPublishNotice = false;
      getMessageListData();

    })
  }
}
const openMessageDialog = (num: number, info: any) => {
  if (num == 2 || num == 3) {
    ElMessageBox.confirm('你确定要删除这个公告', '删除公告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      deleteMessage({ id: info.id }).then(res => {
        ElMessage({
          type: 'success',
          message: '公告删除成功',
        })
        getMessageListData();
      })
    }).catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
  } else {
    state.dialogType = num;
    state.dialogInfo = info;
    state.dialogPublishNotice = true;
  }
}
//获取消息列表
const getMessageListData = () => {
  getMessageData().then(res => {
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
getMessageListData();
// 消息列表公告管理部门进行搜索
const getPublishDataList = () => {
  getPublishData({ publish_bumen: state.formData }).then(res => {
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

//通过消息重要性筛选
const getPublishMessageList = () => {
  getPublishMessage({ notice_dengji: state.radio }).then(res => {
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
// 清空选择框
const clearOpenation = () => {
  getMessageListData()
}
</script>
<style lang="scss" scoped>
.common-wrapped {
  padding: 10px 20px;
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
