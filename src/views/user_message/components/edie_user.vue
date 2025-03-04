<template>
    <el-dialog v-model="state.diagolFormVisible" title='编辑用户信息' width="500px" align-center draggable>
        <div class="dialog-content">
            <el-form ref="ruleFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="账号" prop="account" >
                    <el-input v-model="formData.account" disabled />
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="formData.name" />
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="formData.sex" placeholder="请选择性别">
                        <el-option label="男" value="男" />
                        <el-option label="女" value="女" />
                    </el-select>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formData.email" />
                </el-form-item>
                <el-form-item label="部门" prop="department">
                    <el-select v-model="formData.department" placeholder="请选择部门">
                        <el-option label="总裁办" value="总裁办" />
                        <el-option label="项目部" value="项目部" />
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { bus } from "@/utils/mitt.js"
bus.on('editId', (id: number) => {

})
//动态的标题
const tilte = ref()
//表单数据
interface formData {
    id?: number
    account: number,
    name: string,
    sex: string,
    email: string,
    department: string,
}

const formData: formData = reactive({
    id:'',
    account: '',
    name: '',
    sex: '',
    email: '',
    department: '',
    identity:'用户',
})
//表单规则
const rules = reactive({
    name: [
        { required: true, message: '请输入要修改的用户名', trigger: 'blur' },
    ],
    sex: [
        { required: true, message: '请输入要修改的性别', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入要修改的邮箱', trigger: 'blur' },
    ],
    department: [
        { required: true, message: '请输入要修改的部门', trigger: 'blur' },
    ],
})
//弹窗开关
const state = reactive({
    diagolFormVisible: false,
})
//打开创建管理员的弹窗
const open = () => {
    state.diagolFormVisible = true
}
defineExpose({
    open
})
</script>
<style lang="scss" scoped>
.dialog-content {
    display: flex;
    padding: 20px 30px;
}

:deep(.el-form-item) {
    margin: 20px;
}
</style>