<template>
    <el-dialog v-model="state.dialogFormVisible" :title="title" width="600px" destroy-on-close center>
        <el-container>
            <el-main>
                <div class="content" v-html="valueHtml"></div>
            </el-main>
        </el-container>
    </el-dialog>
</template>

<script lang="ts" setup>
import {
    onBeforeUnmount, ref, 
    reactive
} from 'vue'
import { bus } from "@/utils/mitt.js"
import { updateintroduce } from '@/api/home'

const title = ref()
const valueHtml = ref()
bus.on("introduce", async (id: number) => {
    if (id == 1) {
        title.value = '公司介绍'
        valueHtml.value = await updateIntroduce({ id: state.company.id, type:text,remark:state.company[text] })//{id:7,type:'remark'}        
    }
    if (id == 2) {
        title.value = '公司架构'
        valueHtml.value = await updateIntroduce('公司架构')
    }
    if (id == 3) {
        title.value = '公司战略'
        valueHtml.value = await updateIntroduce('公司战略')
    }
    if (id == 4) {
        title.value = '公司高层'
        valueHtml.value = await updateIntroduce('公司高层')
    }
})
const state = reactive({
    dialogFormVisible: false,
    company: JSON.parse(localStorage.getItem('company')) || {},
});

//公司介绍弹窗
const updateIntroduce =()=>{
	updateintroduce({remark:state.company[text],type:text}).then(res=>{
		if(res.code!=0){
			ElMessage({
				message:res.msg,
				type:'error'
			});
			return;
		}
        state.company.remark = res.data;
        console.log(res.data);
        console.log(state.company.remark);
        localStorage.setItem('company', JSON.stringify(state.company))
	})
}
//获取信息
// const updateIntroduce = () => {
//     updateintroduce({ id: 8, remark: state.company.remark }).then(res => {
//         if (res.code != 0) {
//             ElMessage({
//                 message: res.msg,
//                 type: 'error'
//             });
//             return;
//         }
//         state.company.remark = res.data;
//         console.log(res.data);
//         console.log(state.company.remark);
//         localStorage.setItem('company', JSON.stringify(state.company))
//         ElMessage.success("公司介绍修改成功");
//     })
// };

// 暴露open方法
const open = () => {
    state.dialogFormVisible = true;
};
defineExpose({
    open,
});

// 取消订阅/监听
onBeforeUnmount(() => {
    bus.all.clear()
})
</script>
<style lang="scss" scoped>
.content {
    text-align: center;
}
:deep(.el-main){
min-height: 400px;
}
</style>