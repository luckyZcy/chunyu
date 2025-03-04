<template>
    <el-dialog title="用户信息" v-model="dialogUserVisible" width="500px" center draggable>
        <el-container>
            <el-aside width="200px">
                <el-avatar shape="square" :size="120" :src="state.AccountDetailData.header" />
            </el-aside>
            <el-main>
                <div>账号：{{ state.AccountDetailData.tel }}</div>
                <div>姓名：{{ state.AccountDetailData.name }}</div>
                <div>性别：{{ state.AccountDetailData.sex }}</div>
                <div>部门：{{ state.AccountDetailData.department }}</div>
                <div>邮箱：{{ state.AccountDetailData.email }}</div>
                <div>状态：
                    <span v-if="state.AccountDetailData.status == 0">正常</span>
                    <span v-else>冻结</span>
                </div>
            </el-main>
        </el-container>
        <el-footer>
            <span @click="openEdit">编辑</span>
            <span @click="openPromote">赋权</span>
            <span @click="opendeteleUser">删除用户</span>
        </el-footer>
    </el-dialog>
    <promote ref="Promote"></promote>
    <edit ref="Edit"></edit>
    <deteleuser ref="deteleUser"></deteleuser>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue';
import { bus } from '../../../utils/mitt';
import promote from './promote.vue';
import edit from './edie_user.vue';
import deteleuser from './detele_user.vue';
bus.on('useriId', (row: any) => {
    state.AccountDetailData.id = row.id
    state.AccountDetailData.tel=row.tel
    state.AccountDetailData.name=row.name
    state.AccountDetailData.sex=row.sex
    state.AccountDetailData.department=row.department
    state.AccountDetailData.email=row.email
    state.AccountDetailData.status=row.status
})
const state = reactive({
    AccountDetailData: JSON.parse(localStorage.getItem('userinfo')),
})
//赋权弹窗
const Promote = ref()
const openPromote = (id:number)=>{
    bus.emit('promoteId',id)
    Promote.value.open()
}
//编辑弹窗
const Edit = ref()
const openEdit = (id:number)=>{
    bus.emit('editId',id)
    Edit.value.open()
}

const deteleUser =ref()
const opendeteleUser = (id:number)=>{
    bus.emit('deleteUserId',id)
    deteleUser.value.open()
}
const { squareUrl } = toRefs(state)
//弹窗开关
const dialogUserVisible = ref(false)
//打开弹窗
const open = () => {
    dialogUserVisible.value = true
}
defineExpose({
    open
}) 
</script>

<style lang="scss" scoped>
.el-main>div {
    --el-main-padding: 0px;
    margin-bottom: 8px;
}

.el-main {
    --el-main-padding: 0px;
}

.el-footer {
    display: flex;
    justify-content: flex-end;
    --el-footer-height: 20px;

    span {
        margin-left: 8px;
        color: #409eff;
        cursor: pointer;
    }
}

.el-avatar--square {
    margin-left: 20px;
    margin-top: 10px;
}
</style>