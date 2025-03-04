<template>
  <breadCrumb ref="breadcrumb" :item='state.item'></breadCrumb>
  <!-- 外壳 -->
  <div class="commom-wrapped">
    <!-- 内容 -->
    <div class="common-content">
      <el-tabs v-model="state.activeName" class="demo-tabs">
        <el-tab-pane label="账号详情" name="first">
          <div class="account-info-wrapped">
            <span>用户头像：</span>
            <div class="account-info-content">
              <!-- action是上传头像的接口show-file-list展示上传多少头像 -->
              <el-upload class="avatar-uploader" action="http://192.168.200.1:3000/file/upload" :show-file-list="false"
                :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="state.AccountDetailData.header" :src="state.AccountDetailData.header" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </div>
          </div>
          <!-- 用户账号 -->
          <div class="account-info-wrapped">
            <span>用户账号：</span>
            <div class="account-info-content">
              <el-input v-model="state.AccountDetailData.tel" disabled></el-input>
            </div>
          </div>
          <!-- 用户密码 -->
          <div class="account-info-wrapped">
            <span>用户密码：</span>
            <div class="account-info-content">
              <!-- <el-button type="primary" @click="openChanagePassword">修改密码</el-button> -->
              <el-button type="primary" @click="state.changePasswordDialog = true">修改密码</el-button>
            </div>
          </div>
          <!-- 用户姓名 -->
          <div class="account-info-wrapped">
            <span>用户姓名：</span>
            <div class="account-info-content">
              <el-input v-model="state.AccountDetailData.name"></el-input>
            </div>
            <div class="account-save-button">
              <el-button type="primary" @click="getUserName">保存</el-button>
            </div>
          </div>
          <!-- 用户姓别 -->
          <div class="account-info-wrapped">
            <span>用户性别：</span>
            <div class="account-info-content">
              <el-select v-model="state.AccountDetailData.sex">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </div>
            <div class="account-save-button">
              <el-button type="primary" @click="getUserSex">保存</el-button>
            </div>
          </div>
          <!-- 用户身份 -->
          <div class="account-info-wrapped">
            <span>用户身份：</span>
            <div class="account-info-content">
              <el-input v-model="state.AccountDetailData.identity" disabled></el-input>
            </div>
          </div>
          <!-- 用户部门 -->
          <div class="account-info-wrapped">
            <span>用户部门：</span>
            <div class="account-info-content">
              <el-input v-model="state.AccountDetailData.department" disabled></el-input>
            </div>
          </div>
          <!-- 用户邮箱 -->
          <div class="account-info-wrapped">
            <span>用户邮箱：</span>
            <div class="account-info-content">
              <el-input v-model="state.AccountDetailData.email"></el-input>
            </div>
            <div class="account-save-button">
              <el-button type="primary" @click="getUserEmail">保存</el-button>
            </div>
          </div>

        </el-tab-pane>
        <!-- 公司信息 -->
        <el-tab-pane label="公司信息" name="second">
          <!-- 公司名称： -->
          <div class="account-info-wrapped">
            <span>公司名称</span>
            <div class="account-info-content">
              <el-input v-model="state.company.name"></el-input>
            </div>
            <div class="account-save-button">
              <el-button type="primary" @click="updateCompany">修改公司名称</el-button>
            </div>
          </div>
          <!-- 公司介绍 -->
          <div class="account-info-wrapped">
            <span>公司介绍</span>
            <div class="account-info-content">
              <el-button type="success" @click="state.companyintroduct = true">编辑公司介绍</el-button>
            </div>
          </div>
          <!-- 公司架构 -->
          <div class="account-info-wrapped">
            <span>公司架构</span>
            <div class="account-info-content">
              <el-button type="success" @click="state.companystructure = true">编辑公司架构</el-button>
            </div>
          </div>
          <!-- 公司战略 -->
          <div class="account-info-wrapped">
            <span>公司战略</span>
            <div class="account-info-content">
              <el-button type="success" @click="state.companystrategy = true">编辑公司战略</el-button>
            </div>
          </div>
          <!-- 公司高层 -->
          <div class="account-info-wrapped">
            <span>公司高层</span>
            <div class="account-info-content">
              <el-button type="success" @click="state.companytop = true">编辑公司高层</el-button>
            </div>
          </div>
        </el-tab-pane>
        <!-- 首页管理 -->
        <el-tab-pane label="首页管理" name="third">
          <div class="home-wrapped">
            <!-- 提示 -->
            <div class="tips">
              <span>提示：点击图片框进行切换首页轮播图</span>
            </div>
            <!-- 轮播图部分 -->
            <div class="swiper-wrapped" v-for="(item, index) in swiperData" :key="index">
              <div class="swiper-name">轮播图{{ index + 1 }}：</div>
              <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false" :on-success="handleSwiperSuccess" :before-upload="beforeAvatarUpload"
                :data="item">
                <template #trigger>
                  <img v-if="state.imageUrl" :src="state.imageUrl" class="swiper" />
                  <img src="../../assets/bg1.jpg" class="swiper" v-else>
                </template>
              </el-upload>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他设置" name="fourth">
          <div class="other-set">
            <div class="department-set">
              <span>部门设置</span>
              <el-tag v-for="tag in dynamicTags" :key="tag" closable :disable-transitions="false"
                @close="handleClose(tag)">
                {{ tag }}
              </el-tag>
              <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" style="width: 100px;height: 24px;"
                @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
              <el-button v-else class="button-new-tag" style="width: 76px;height: 24px;" @click="showInput">
                + New Tag
              </el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 修改密码 -->
    <el-dialog v-model="state.changePasswordDialog" title="修改密码" width="400px">
      <el-form class="login-form" :model="state.forgetData" :rules="state.rules">
        <el-form-item label="输入您的旧密码" prop="password">
          <el-input v-model="state.forgetData.password" placeholder="输入您的旧密码" show-password />
        </el-form-item>
        <el-form-item label="输入您的新密码" prop="repassword">
          <el-input v-model="state.forgetData.repassword" placeholder="输入您的新密码" show-password />
        </el-form-item>
      </el-form>
      <!-- 底部内容 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="state.changePasswordDialog = false">取消</el-button>
          <el-button type="primary" @click="getCmodifyChange">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 编辑公司介绍 -->
    <el-dialog v-model="state.companyintroduct" title="编辑公司介绍" width="500px">
      <el-input v-model="state.company.remark" style="width: 450px" :rows="6" type="textarea" />
      <!-- 底部内容 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="state.companyintroduct = false">取消</el-button>
          <el-button type="primary" @click="updateIntroduce('remark')">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 编辑公司架构 -->
    <el-dialog v-model="state.companystructure" title="编辑公司架构" width="500px">
      <el-input v-model="state.company.jiagou" style="width: 450px" :rows="6" type="textarea" />
      <!-- 底部内容 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="state.companystructure = false">取消</el-button>
          <el-button type="primary" @click="updateIntroduce('jiagou')">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 编辑公司战略 -->
    <el-dialog v-model="state.companystrategy" title="编辑公司战略" width="500px">
      <el-input v-model="state.company.zhanlue" style="width: 450px" :rows="6" type="textarea" />
      <!-- 底部内容 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="state.companystrategy = false">取消</el-button>
          <el-button type="primary" @click="updateIntroduce('zhanlue')">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 编辑公司高层 -->
    <el-dialog v-model="state.companytop" title="编辑公司高层" width="500px">
      <el-input v-model="state.company.gaoceng" style="width: 450px" :rows="6" type="textarea" />
      <!-- 底部内容 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="state.companytop = false">取消</el-button>
          <el-button type="primary" @click="updateIntroduce('gaoceng')">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, nextTick, toRaw } from 'vue'
import breadCrumb from '../../components/bread_crumb.vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { cmodify, editUserInfo } from '../../api/login'
import { updatecompany, updateintroduce } from '../../api/login'

//面包屑
const breadcrumb = ref()

// 账号

const state = reactive({
  changePasswordDialog: false,//控制弹窗的隐藏显示
  forgetData: {
    password: '',
    repassword: '',
  },
  imageUrl: '',
  item: {
    first: "系统设置",
  },
  rules: {
    password: [
      { required: true, message: '请输入您想修改的密码', trigger: 'blur' },
    ],
    repassword: [
      { required: true, message: '请再次确认您的新密码', trigger: 'blur' },
    ],
  },
  activeName: 'first',
  AccountDetailData: JSON.parse(localStorage.getItem('userinfo') || ''),
  company: JSON.parse(localStorage.getItem('company') || ''),
  companyintroduct: false,
  companystructure: false,
  companystrategy: false,
  companytop: false,
  textarea: '',
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (res, uploadFile) => {
  console.log("上传头像的回调")
  console.log(res, uploadFile)
  // res.path 上传成功的地址
  editUserInfo({ msg: res.path, id: state.AccountDetailData.id, type: 'header' }).then(res => {
    console.log(res);
    if (res.code != 0) {
      ElMessage({
        message: res.mag,
        type: 'error'
      });
      return;
    }
    state.AccountDetailData.header = res.data;
    localStorage.setItem('userinfo', JSON.stringify(state.AccountDetailData));
    ElMessage.success("header更新成功")
  })

}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // if (rawFile.type !== 'image/jpeg') {
  //   ElMessage.error('头像必须是jpg格式!')
  //   return false
  // } else if (rawFile.size / 1024 / 1024 > 2) {
  //   ElMessage.error('头像必须小于2MB!')
  //   return false
  // }
  return true
}

// //打开修改密码的弹窗
// const openChanagePassword = () => {
//   state.changePasswordDialog = true
// }

//修改密码
const getCmodifyChange = () => {
  state.forgetData.id = state.AccountDetailData.id
  // cmodify表示vue定义的请求服务器的api方法
  // state.forgetData表示请求的参数
  // then表示回调，es6的写法
  // res表示回调的信息，是请求当前接口，后端的返回信息
  // cmodify(state.forgetData).then(res=>{})
  if (state.forgetData.password == '' || state.forgetData.repassword == '') {
    ElMessage({
      message: "密码不能为空",
      type: 'error'
    });
    return;
  }
  cmodify(state.forgetData).then(res => {

    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      });
      return;
    }
    ElMessage.success("修改成功");
    state.changePasswordDialog = false;

  })
  // openChanagePassword();
}
//修改用户名
const getUserName = () => {
  let info = {
    id: state.AccountDetailData.id,
    msg: state.AccountDetailData.name,
    type: 'name',
  }

  // username(info).then(res => {
  editUserInfo(info).then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      });
      return;
    }
    state.AccountDetailData.name = res.data;
    console.log(res.data);
    console.log(state.AccountDetailData.name);

    localStorage.setItem('userinfo', JSON.stringify(state.AccountDetailData));
    ElMessage.success("用户名修改成功")

  })
}
//修改性别
const getUserSex = () => {
  // usersex({id:state.AccountDetailData.id,sex:state.AccountDetailData.sex}).then(res => {
  editUserInfo({ id: state.AccountDetailData.id, msg: state.AccountDetailData.sex, type: 'sex' }).then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      });
      return;
    }
    state.AccountDetailData.sex = res.data;
    localStorage.setItem('userinfo', JSON.stringify(state.AccountDetailData));
    ElMessage.success("性别修改成功")
  })
}
//修改邮箱
const getUserEmail = () => {
  // useremail({id:state.AccountDetailData.id,email:state.AccountDetailData.email}).then(res => {
  editUserInfo({ id: state.AccountDetailData.id, msg: state.AccountDetailData.email, type: 'email' }).then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      });
      return;
    }
    state.AccountDetailData.email = res.data;
    localStorage.setItem('userinfo', JSON.stringify(state.AccountDetailData))
    ElMessage.success("邮箱修改成功")
  })
}
//修改公司名称
const updateCompany = () => {
  updatecompany({ id: state.company.id, name: state.company.name }).then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      });
      return;
    }
    state.company.name = res.data;
    console.log(res.data);

    localStorage.setItem('company', JSON.stringify(state.company))
    ElMessage.success("公司名称修改成功");
  })
};
//修改公司介绍
const updateIntroduce = (text) => {
  updateintroduce({ id: state.company.id, remark: state.company[text], type: text }).then(res => {
    if (res.code != 0) {
      ElMessage({
        message: res.msg,
        type: 'error'
      });
      return;
    }
    state.company[text] = res.data;
    state.companyintroduct = false;
    localStorage.setItem('company', JSON.stringify(state.company))
    ElMessage.success("公司信息修改成功");
  })
};
const editorP = ref()
//首页上传轮播图
const handleSwiperSuccess = () => ({})
const swiperData = [{ name: 'swiper1' }, { name: 'swiper2' }, { name: 'swiper3' }, { name: 'swiper4' }, { name: 'swiper5' }, { name: 'swiper6' }]

//其他设置部门设置
const inputValue = ref('')
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
const InputRef = ref<InputInstance>()
//关闭时执行的回调函数
const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
  const res = JSON.stringify(toRaw(dynamicTags.value))
  console.log(res);

}
//点击按钮
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}
//输入数据后处理的函数
const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<style lang="scss" scoped>
// 外壳
.commom-wrapped {
  padding: 8px;
  background: #fff;
  //减去头部还有面包屑
  height: calc(100vh - 101px);

  // 内容
  .common-content {
    padding: 0 10px;
    // height: 100%;
    background: #fff;

    // 账号信息外壳
    .account-info-wrapped {
      display: flex;
      align-items: center;
      padding-left: 50px;
      margin-bottom: 24px;
      font-size: 14px;


      // 账号信息内容
      .account-info-content {
        min-width: 200px;
        margin-left: 24px;
        margin-right: 16px;

        .company-name {
          font-size: 18px;
        }
      }

      //保存按钮
      .account-save-button {
        margin-left: 16px;
      }
    }

    //首页轮播图
    .home-wrapped {
      padding-left: 50px;
      display: flex;
      flex-direction: column;

      //提示
      .tips {
        display: flex;
        align-items: center;
        margin-bottom: 8px;

        span {
          font-size: 14px;
          color: silver;
        }
      }

      //轮播图
      .swiper-wrapped {
        display: flex;
        margin-bottom: 9px;

        //轮播图名字
        .swiper-name {
          font-size: 14px;
          margin-bottom: 24px;
        }

        .swiper {
          width: 244px;
          height: 73px;
        }
      }
    }

  }

  .el-icon.avatar-uploader-icon {
    width: 100px;
    height: 100px;
  }
}

// 标签页
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

// 上传头像
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
}

//其他设置部门设置
.other-set {
  padding-left: 50px;
  font-size: 14px;

  .department-set {
    margin-bottom: 24px;

    span {
      margin-right: 24px;
    }
  }
}
</style>
