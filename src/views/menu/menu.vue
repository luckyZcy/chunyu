<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu class="el-menu-vertical-demo" router>
          <div class="title">后台管理系统</div>
          <el-menu-item index="overview">
            <el-icon>
              <Document />
            </el-icon>
            <span>系统概览</span>
          </el-menu-item>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <User />
              </el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item-group title="管理员管理">
              <el-menu-item index="product_message">产品管理员</el-menu-item>
              <el-menu-item index="users_message">用户管理员</el-menu-item>
              <el-menu-item index="message_message">消息管理员</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="员工管理">
              <el-menu-item index="user_list">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <el-icon>
                <TakeawayBox />
              </el-icon>
              <span>产品管理</span>
            </template>
            <el-menu-item-group title="入库管理">
              <el-menu-item index="product_list">产品列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="出库管理">
              <el-menu-item index="outbound_list">出库列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <el-icon>
                <ChatSquare />
              </el-icon>
              <span>消息管理</span>
            </template>
            <el-menu-item-group title="消息管理">
              <el-menu-item index="message_list">消息列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="回收站">
              <el-menu-item index="recycle_bin">回收站</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="operation_log">
            <el-icon>
              <DocumentCopy />
            </el-icon>
            <span>操作日志</span>
          </el-menu-item>
          <!-- <el-menu-item index="login_log">
            <el-icon>
              <icon-menu />
            </el-icon>
            <span>登录日志</span>
          </el-menu-item> -->
          <!-- <el-menu-item index="set">
            <el-icon>
              <Tools />
            </el-icon>
            <span>系统设置</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="header-left-content">尊敬的 {{ state.Username.name }} 欢迎您登录本系统</span>
          <div class="header-right-content">
            <el-icon :size="20">
              <Message />
            </el-icon>
            <el-avatar :size="24" :src="state.Username.header" />
            <el-dropdown>
              <span class="el-dropdown-link">
                设置
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>设置账号</el-dropdown-item>
                  <el-dropdown-item>更改头像</el-dropdown-item>
                  <el-dropdown-item @click="goLogin">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <routerView></routerView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue'
import { RouterView } from 'vue-router'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'//路由跳转
const router = useRouter()
const state = reactive({
  circleUrl:
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  Username: JSON.parse(localStorage.getItem('userinfo') || ''),
})
const goLogin = () => {
  localStorage.removeItem("userinfo");
  localStorage.removeItem("company");
  localStorage.removeItem("token")
  router.push('/login')
}

</script>

<style scoped>
.el-container {
  height: 100vh;
}

.el-aside {
  height: 100vh;
  background: #2b303b;
  width: 210px;
}

.el-aside::-webkit-scrollbar {
  display: none;
}

.el-menu {
  background: #2b303b;
  width: 210px;
  height: 100vh;
  border-right: 0px;
}

.title {
  padding: 20px;
  display: flex;
  justify-content: center;
  color: #fff;
  background: #2b303b;
}

.el-menu-item {
  color: #fff;
}

.el-header {
  display: flex;
  height: 55px;
  background: #262f3e;
  color: #c1c6c8;
  align-items: center;
  justify-content: space-between;
}

.header-left-content {
  font-size: 14px;
}

.header-right-content {
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: space-around
}

.el-dropdown-link {
  border: none;
  outline: none;
}

.el-main {
  height: calc(100vh - 55px);
  --el-main-padding: 0;
  background: #f3f4fa;
}

.el-main::-webkit-scrollbar {
  display: none;
}

.el-menu-item:hover {
  background-color: #006eff;
}

:deep(.el-sub-menu__title:hover) {
  background-color: #006eff;
}

:deep(.el-sub-menu__title) {
  color: #fff;
}

:deep(.el-menu--inline) {
  background: #2b303b;
}
</style>
