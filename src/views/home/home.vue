<template>
  <div class="home-wrapped">111</div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
// import { getCompanyInfo, getHomePageMessage } from '../../api/login'
import { ElMessage } from 'element-plus';
//面包屑
const state = reactive({
  // company: JSON.parse(localStorage.getItem('company') || ''),
  item: {
    first: '首页'
  },
  tableData: [],
  tableDataTow: [],
  companystructure: false,
  companyintroduct: false,
  companystrategy: false,
  companytop: false,
})

const getCompany = () => {
  let company = JSON.parse(localStorage.getItem("userinfo") || '');
  getCompanyInfo({ id: company.company_id }).then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      });
      return;
    }
    res.data.img = JSON.parse(res.data.img)
    state.company = res.data;
    localStorage.setItem('company', JSON.stringify(res.data))
  })
}
// getCompany();
const getHomePageMessageList = () => {
  getHomePageMessage().then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error',
      })
      return;
    }
    state.tableData = res.data;
    state.tableDataTow = res.data;
  })
}
// getHomePageMessageList();

</script>

<style scoped>
.home-wrapped {
  height: 200px;
  background-color: pink;
}
</style>
