<template>
    <el-dialog v-model="state.diagolDeleteVisible" title='删除操作' width="500px" center align-center draggable>
        <span>请慎重操作,删除后此用户将永久失去登录资格</span>
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
bus.on('deleteUserId', (id: number) => {

})

//弹窗开关
const state = reactive({
    diagolDeleteVisible: false,
})
//打开创建管理员的弹窗
const open = () => {
    state.diagolDeleteVisible = true
}
defineExpose({
    open
})
</script>
<style lang="scss" scoped>
</style>