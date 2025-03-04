<template>
    <el-dialog title="赋权操作" v-model="dialogPromoteVisible" width="450px" center>
        <el-radio-group v-model="radio2">
            <el-radio value="1" size="large">产品管理员</el-radio>
            <el-radio value="2" size="large">用户管理员</el-radio>
            <el-radio value="3" size="large">消息管理员</el-radio>
        </el-radio-group>
        <template #footer>
<span class="dialog-footer">
    <!-- <el-button>取消</el-button> -->
    <el-button type="primary">确定</el-button>
</span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { bus } from '../../../utils/mitt';
bus.on('promoteId',(id:any)=>{

})
const radio2 = ref(1)
//弹窗开关
const dialogPromoteVisible = ref(false)
//打开赋权操作弹窗
const open = () => {
    dialogPromoteVisible.value = true
}
defineExpose({
    open
})
</script>
<style lang="scss" scoped>
.el-dialog--center{
    text-align: center;
}
</style>