<template>
  <!-- 系统概览外壳 -->
  <div class="overview-wrapped">
    <!-- 顶部内容外壳 -->
    <div class="top-content-wrapped">
      <!-- 个人信息 -->
      <div class="person-infor">
        <!-- 用户头像外壳 -->
        <div class="person-avater-wrapped">
          <el-avatar :size="90" :src="state.AccountDetailData.header" />
          <span class="department">所属部门：{{ item.AccountDetailData.department }}</span>
          <div class="company">所属公司：河南</div>
        </div>
        <!-- 竖线 -->
        <div class="line-wrapped">
          <div class="line"></div>
        </div>
        <!-- 详细信息外壳 -->
        <div class="detail-infor-wrapped">
          <p>姓名：{{ item.AccountDetailData.name }}</p>
          <p>性别：{{ item.AccountDetailData.sex }}</p>
          <p>身份：{{ item.AccountDetailData.identity }}</p>
          <p>分管区域：超级管理员</p>
          <p>权限：最高权限</p>
        </div>
      </div>
      <div class="manage-user pie">
      </div>
    </div>
    <!-- 中间内容外壳 -->
    <div class="mid-content-wrapped">
      <div class="product-category-bar mid-content-left"></div>
      <div class="mid-content-right">
        <div class="title">常用管理</div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="button-area">

              <el-icon size="24">
                <House />
              </el-icon>
              <span class="button-name">用户管理</span>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="button-area">
              <el-icon size="24">
                <Shop />
              </el-icon>
              <span class="button-name">产品管理</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="button-area">
              <el-icon size="24">
                <ChatLineRound />
              </el-icon>
              <span class="button-name">系统消息</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="button-area">
              <el-icon size="24">
                <User />
              </el-icon>
              <span class="button-name">个人信息</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="button-area">
              <el-icon size="24">
                <MessageBox />
              </el-icon>
              <span class="button-name">部门信息</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="button-area">
              <el-icon size="24">
                <Setting />
              </el-icon>
              <span class="button-name">系统设置</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 底部内容外壳 -->
    <div class="footer-content-wrapped">
      <div class="massage-level footer-content-left"></div>
      <div class="userlogin-week footer-content-right"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import * as echarts from 'echarts';
// 调用echarts图
onMounted(() => {
  manageUser()
  productCategoryBar()
  massageLevel()
  massageAllDay()
})
const breadcrumb = ref()
const item = ref({
  first: "系统概览",
  AccountDetailData: JSON.parse(localStorage.getItem('userinfo') || ''),
})
// 管理员与用户比值图
const manageUser = () => {
  // 通过类名 初始化
  const mu = echarts.init(document.querySelector('.manage-user'))
  document.querySelector('.manage-user').setAttribute('_echarts_instance_', '')
  // 设置基本的参数
  mu.setOption({
    title: {
      text: '管理与用户对比图',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      padding: [20, 20, 20, 20]
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: '65%',
        data: [{ value: 176, name: '部长' },
        { value: 332, name: '主管' },
        { value: 1048, name: '员工' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
  // 用于echarts响应式
  window.addEventListener('resize', function () {
    mu.resize()
  })
}

// 产品类别图
const productCategoryBar = async () => {
  const pcb = echarts.init(document.querySelector('.product-category-bar'))
  document.querySelector('.product-category-bar').setAttribute('_echarts_instance_', '')
  pcb.setOption({
    title: {
      text: "产品类别库存总价图",
      top: "3%",
      textStyle: {
        fontSize: 16
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      // 食品类，服装类，鞋帽类，日用品类，家具类，家用电器类，纺织品类，五金类
      data: ['食品', '服装', '鞋帽', '日用品', '家具', '家用电器', '纺织品']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        barWidth: 40,
        colorBy: "data"
      },
    ]
  })
  window.addEventListener('resize', function () {
    pcb.resize()
  })
}

// 公告等级分布图
const massageLevel = () => {
  const ml = echarts.init(document.querySelector('.massage-level'))
  document.querySelector('.massage-level').setAttribute('_echarts_instance_', '')
  ml.setOption({
    title: {
      text: "公告等级分布图",
      top: "0%",
      textStyle: {
        fontSize: 16
      },
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: ['35%', '65%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '一般' },
          { value: 735, name: '重要' },
          { value: 580, name: '必要' },
        ],
      }
    ]
  })
  window.addEventListener('resize', function () {
    ml.resize()
  })
}

// 消息每日总量图
const massageAllDay = () => {
  const mad = echarts.init(document.querySelector('.userlogin-week'))
  document.querySelector('.userlogin-week').setAttribute('_echarts_instance_', '')
  mad.setOption({
    title: {
      text: "每日登录人数图",
      top: "3%",
      textStyle: {
        fontSize: 16
      },
    },
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  })
  window.addEventListener('resize', function () {
    mad.resize()
  })
}


//头像
const state = reactive({
  AccountDetailData: JSON.parse(localStorage.getItem('userinfo') || ''),

})
</script>

<style scoped>
.overview-wrapped {
  padding: 8px;
  height: calc(100vh - 73px);
  background: #f8f8f8;
}

.footer-content-wrapped {
  margin-top: 8px;
  height: calc(38% - 8px);
  display: flex;
}

.footer-content-left {
  margin-right: 8px;
  height: 100%;
  width: calc(30% - 8px);
  background: #fff;
}

.footer-content-right {
  height: 100%;
  width: calc(70%);
  background: #fff;
}

.mid-content-wrapped {
  margin-top: 8px;
  height: calc(32% - 8px);
  display: flex;
}

.mid-content-left {
  margin-right: 8px;
  width: calc(60% - 8px);
  background: #fff;
}

.mid-content-right {
  width: calc(40%);
  background: #fff;
  padding: 8px;

}

.title {
  font-size: 14px;
  margin-bottom: 8px;
}

.button-area {
  margin-bottom: 8px;
  height: 67px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: #F5F5F5;
}

.button-area:hover {
  background: #e4efff;
}

.button-name {
  margin-top: 10px;
}

.top-content-wrapped {
  height: 30%;
  display: flex;
}

.pie {
  width: calc(50%);
  height: 100%;
  background: #fff;
}

.person-infor {
  height: 100%;
  margin-right: 8px;
  width: calc(50% - 8px);
  display: flex;
  background: #fff;
}

P {
  margin-top: 6px;
}

.line-wrapped {
  height: 100%;
  display: flex;
  align-items: center;
}

.line {
  height: 150px;
  border: 1px solid #D3D3D3;
}

.detail-infor-wrapped {
  height: 100%;
  width: calc(50% - 1px);
  margin-left: 50px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.person-avater-wrapped {
  display: flex;
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.company {
  margin: 10px 0px;
  font-size: 12px;
}

.department {
  margin-top: 8px;
  font-size: 12px;
}
</style>
