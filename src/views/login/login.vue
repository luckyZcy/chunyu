<template>
  <div class="wrap">
    <div class="container">
      <div class="title">欢迎登录</div>
      <el-tabs v-model="activeName" class="demo-tabs" :stretch='true'>
        <el-tab-pane label="登录" name="first">
          <el-form class="login-form">
            <el-form-item label="账号">
              <el-input v-model="loginForm.account" placeholder="请输入账号" clearable />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="loginForm.password" placeholder="请输入密码" show-password clearable />
            </el-form-item>
            <!-- 底部外壳 -->
            <div class="forget-password">
              <el-checkbox v-model="checked" label="记住密码" />
              <el-link>忘记密码</el-link>
            </div>
            <!-- 登录按钮 -->
            <el-button :class="{ 'is-active': canLogin }" @click="LoginList">登录</el-button>
            <div class="register">
              <span>没有账号？<a @click="regirstClick">去注册</a></span>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <el-form class="login-form">
            <el-form-item label="账号">
              <el-input v-model="registerFrom.tel" placeholder="请输入手机号" maxlength="11" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="registerFrom.password" placeholder="请设置密码不超过12位" maxlength="12" />
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="registerFrom.repassword" placeholder="请再次输入密码" />
            </el-form-item>
            <el-button :class="{ 'is-active': Registerbtn }" @click="RegisterList">注册</el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="square">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="circle">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { login, register } from '../../api/login';

export default {
  data() {
    return {
      // 组件内部的数据状态
      activeName: 'first',
      loginForm: {
        account: localStorage.getItem('name') ?? '',
        password: localStorage.getItem('password') ?? '',
        // account: '',
        // password: '',
      },
      registerFrom: {
        tel: '',
        password: '',
        repassword: '',
      },
      router: useRouter()
    };
  },
  computed: {
    // 计算属性
    canLogin() {
      return this.loginForm.account.trim() !== '' && this.loginForm.password.trim() !== '';
    },
    Registerbtn() {
      return this.registerFrom.tel.trim() !== '' && this.registerFrom.password.trim() !== '' && this.registerFrom.repassword.trim() !== '';
    }
  },
  methods: {
    // 组件方法
    regirstClick() {
      this.activeName = 'second'
    },
    //登录
    LoginList() {
      login(this.loginForm).then(res => {
        console.log(res);
        if (res.code != 0) {
          ElMessage({
            message: '验证失败！请重新输入',
            type: 'error'
          })
          return
        }
        ElMessage.success('登录成功！')
        console.log(res.data);
        localStorage.setItem('userinfo', JSON.stringify(res.data))
        // localStorage.setItem('roles', JSON.stringify(res.data.idenyity))
        if (localStorage.getItem('checked') === 'true') {
          console.log(this.checked);
          localStorage.setItem('name', this.loginForm.account)
          localStorage.setItem('password', this.loginForm.password)
        } else {
          localStorage.removeItem('name')
          localStorage.removeItem('password')
        }
        this.router.push('/overview')
      })
    },
    //注册
    RegisterList() {
      register(this.registerFrom).then(res => {
        if (res.code != 0) {
          ElMessage({
            message: res.msg,
            type: 'error'
          })
          return
        }
        ElMessage.success("注册成功！快去登录吧")
        router.push('/login')
      })
    }
  },
  mounted() {
    // 挂载到DOM后的操作
  },
  setup() {
    const checked = ref(localStorage.getItem('checked') === 'true')
    watch(checked, (newValue) => {
      localStorage.setItem('checked', String(newValue));
    })
    return {
      checked,
    }
  }

}

</script>
<style scoped>
.wrap {
  width: 100%;
  height: 100%;
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(200deg, #e3c5eb, #a9c1ed);
  overflow: hidden;
}

.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  height: 457px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, .1);
  z-index: 1;
}

.title {
  font-size: 26px;
  margin: 65px auto 12px;
}

.forget-password {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.el-link {
  --el-link-font-size: 12px;
}

.register {
  text-align: center;
  font-size: 12px;
  margin-top: -27px;
  cursor: pointer;
}

.el-button {
  width: 280px;
  height: 40px;
  margin: 14px auto 40px;
  border: none;
  background: linear-gradient(#fac0e7, #aac2ee);
  color: #fff;
  font-weight: bold;
  letter-spacing: 8px;
  border-radius: 10px;
  cursor: pointer;
  opacity: 0.7;
}

.is-active {
  opacity: 1;
}

.button:hover {
  background: linear-gradient(-200deg, #aac2ee, #f2c0e7);
  background-position-x: -280px;
}

a {
  color: plum;
  text-decoration: none;
}

ul li {
  position: absolute;
  border: 1px solid #fff;
  background-color: #fff;
  width: 30px;
  height: 30px;
  list-style: none;
  /* opacity: 0; */
}

.square li {
  top: 40vh;
  left: 60vw;
  /* 执行动画 动画名称 时长 线性 无限次 */
  animation: square 10s linear infinite;
}

.square li:nth-child(2) {
  top: 80vh;
  left: 10vh;
  /* 动画延时时间 */
  animation-delay: 2s;
}

.square li:nth-child(3) {
  top: 80vh;
  left: 85vw;
  /* 动画延时时间 */
  animation-delay: 4s;
}

.square li:nth-child(4) {
  top: 10vh;
  left: 70vw;
  /* 动画延时时间 */
  animation-delay: 6s;
}

.square li:nth-child(5) {
  top: 10vh;
  left: 10vw;
  /* 动画延时时间 */
  animation-delay: 8s;
}

.circle li {
  bottom: 0;
  left: 15vw;
  /* 执行动画 */
  animation: circle 10s linear infinite;
}

.circle li:nth-child(2) {
  left: 35vw;
  /* 动画延时时间 */
  animation-delay: 2s;
}

.circle li:nth-child(3) {
  left: 55vw;
  /* 动画延时时间 */
  animation-delay: 4s;
}

.circle li:nth-child(4) {
  left: 75vw;
  /* 动画延时时间 */
  animation-delay: 6s;
}

.circle li:nth-child(5) {
  left: 90vw;
  /* 动画延时时间 */
  animation-delay: 8s;
}

/* 定义动画 */
@keyframes square {
  0% {
    transform: scale(0) rotateY(0deg);
    opacity: 1;
  }

  100% {
    transform: scale(5) rotateY(1000deg);
    opacity: 0;
  }
}

@keyframes circle {
  0% {
    transform: scale(0) rotateY(0deg);
    opacity: 1;
    bottom: 0;
    border-radius: 0;
  }

  100% {
    transform: scale(5) rotateY(1000deg);
    opacity: 0;
    bottom: 90vh;
    border-radius: 50%;
  }
}

:deep(.el-input__wrapper) {
  box-shadow: none;
}

:deep(.el-checkbox) {
  --el-checkbox-font-size: 12px !important;
}
</style>
