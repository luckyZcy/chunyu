import instance from '../http/index.js'

// 注册接口
export const register = (data: any) => {
  return instance({
    url: '/register',
    method: 'POST',
    data: data,
  })
}
//登录接口
export const login = (data: any) => {
  return instance({
    url: '/login',
    method: 'POST',
    data: data,
  })
}
//忘记密码
export const forget = (data: any) => {
  return instance({
    url: '/forget',
    method: 'POST',
    data: data,
  })
}
//修改密码
export const modify = (data: any) => {
  return instance({
    url: '/modify',
    method: 'POST',
    data: data,
  })
}
//设置修改密码
export const cmodify = (data: any) => {
  return instance({
    url: '/cmodify',
    method: 'POST',
    data: data,
  })
}
//用户名修改
export const username = (data: any) => {
  return instance({
    url: '/username',
    method: 'POST',
    data: data,
  })
}
//性别修改
export const usersex = (data: any) => {
  return instance({
    url: '/usersex',
    method: 'POST',
    data: data,
  })
}
//邮箱修改
export const useremail = (data: any) => {
  return instance({
    url: '/useremail',
    method: 'POST',
    data: data,
  })
}

//用户信息修改
export const editUserInfo = (data: any) => {
  return instance({
    url: '/updateUser',
    method: 'POST',
    data: data,
  })
}
// 获取公司消息
export const getCompanyInfo = (data: any) => {
  return instance({
    url: '/getCompanyInfo',
    method: 'POST',
    data: data,
  })
}

//修改公司名称
export const updatecompany = (name) => {
  return instance({
    url: '/updatecompany',
    method: 'POST',
    data: name,
  })
}
//公司介绍
export const updateintroduce = (data: any) => {
  return instance({
    url: '/updateintroduce',
    method: 'POST',
    data: data,
  })
}
//添加产品管理员
export const updateProductManager = (data: any) => {
  return instance({
    url: '/update_product_manager',
    method: 'POST',
    data: data,
  })
}
//编辑管理员信息
export const updateEditManager = (data: any) => {
  return instance({
    url: '/update_edit_manager',
    method: 'POST',
    data: data,
  })
}
//获取用户列表
export const getTableData = (data: any) => {
  return instance({
    url: '/get_table_data',
    method: 'POST',
    data: data,
  })
}
// 通过账号进行搜索
export const searchAccountData = (data: any) => {
  return instance({
    url: '/search_account_data',
    method: 'POST',
    data: data,
  })
}
//通过部门进行搜索
export const searchDepartmentData = (data: any) => {
  return instance({
    url: '/search_department_data',
    method: 'POST',
    data: data,
  })
}
//删除操作
export const deleteInfo = (data: any) => {
  return instance({
    url: '/delete_info',
    method: 'POST',
    data: data,
  })
}
//获取产品列表
export const getProductData = (data: any) => {
  return instance({
    url: '/get_product_data',
    method: 'POST',
    data: data,
  })
}

//添加产品信息
export const updateProductNews = (data: any) => {
  return instance({
    url: '/update_product_news',
    method: 'POST',
    data: data,
  })
}
//编辑产品信息
export const updateEditProduct = (data: any) => {
  return instance({
    url: '/update_edit_product',
    method: 'POST',
    data: data,
  })
}
//获取消息列表
export const getMessageData = (data: any) => {
  return instance({
    url: '/get_message_data',
    method: 'POST',
    data: data,
  })
}
//添加公告信息
export const updateNoticeNews = (data: any) => {
  return instance({
    url: '/update_notice_news',
    method: 'POST',
    data: data,
  })
}
//编辑公告信息
export const updateEditNotice = (data: any) => {
  return instance({
    url: '/update_edit_notice',
    method: 'POST',
    data: data,
  })
}
//用户冻结
export const updateFreeZe = (data: any) => {
  return instance({
    url: '/update_free_ze',
    method: 'POST',
    data: data,
  })
}
//用户解冻
export const updateThaw = (data: any) => {
  return instance({
    url: '/update_thaw',
    method: 'POST',
    data: data,
  })
}
//筛选冻结用户
export const searchFreeZe = (data: any) => {
  return instance({
    url: '/search_free_ze',
    method: 'POST',
    data: data,
  })
}
//申请出库
export const updateWarehouse = (data: any) => {
  return instance({
    url: '/update_warehouse',
    method: 'POST',
    data: data,
  })
}
//产品列表删除操作
export const deleteProduct = (data: any) => {
  return instance({
    url: '/delete_product',
    method: 'POST',
    data: data,
  })
}
//通过入库编号进行搜索
export const searchWarehouseData = (data: any) => {
  return instance({
    url: '/search_warehouse_data',
    method: 'POST',
    data: data,
  })
}
//通过申请出库编号进行搜索
export const searchApplyWarehouse = (data: any) => {
  return instance({
    url: '/search_apply_warehouse',
    method: 'POST',
    data: data,
  })
}
//通过出库编号进行搜索
export const searchOutWarehouse = (data: any) => {
  return instance({
    url: '/search_out_warehouse',
    method: 'POST',
    data: data,
  })
}
//消息列表公告管理部门搜索
export const getPublishData = (data: any) => {
  return instance({
    url: '/get_publish_data',
    method: 'POST',
    data: data,
  })
}
// 通过消息重要性筛选
export const getPublishMessage = (data: any) => {
  return instance({
    url: '/get_publish_message',
    method: 'POST',
    data: data,
  })
}
//分页
export const getPagingData = (data: any) => {
  return instance({
    url: '/get_paging_data',
    method: 'POST',
    data: data,
  })
}
//获取操作日志内容
export const getOperationlogData = (data: any) => {
  return instance({
    url: '/get_operationlog_data',
    method: 'POST',
    data: data,
  })
}
//获取登录日志内容
export const getJournalData = (data: any) => {
  return instance({
    url: '/get_journal_data',
    method: 'POST',
    data: data,
  })
}
//通过操作者进行搜索
export const searchOperatorData = (data: any) => {
  return instance({
    url: '/search_operator_data',
    method: 'POST',
    data: data,
  })
}
//通过账号进行搜索
export const searchAccount = (data: any) => {
  return instance({
    url: '/search_account',
    method: 'POST',
    data: data,
  })
}
//首页公司公告
export const getHomePageMessage = (data: any) => {
  return instance({
    url: '/get_home_page_message',
    method: 'POST',
    data: data,
  })
}
//清空操作日志
export const deteleOperationlog = (data: any) => {
  return instance({
    url: '/detele_operationlog',
    method: 'POST',
    data: data,
  })
}
//清空登录日志
export const deteleJournalData = (data: any) => {
  return instance({
    url: '/detele_journal_data',
    method: 'POST',
    data: data,
  })
}
//系统消息编辑
export const updateSystemMessage = (data: any) => {
  return instance({
    url: '/update_system_message',
    method: 'POST',
    data: data,
  })
}
// 消息管理列表删除
export const deleteMessage = (data: any) => {
  return instance({
    url: '/delete_message',
    method: 'POST',
    data: data,
  })
}
// 回收站获取消息列表
export const getRecycleData = (data: any) => {
  return instance({
    url: '/get_recycle_data',
    method: 'POST',
    data: data,
  })
}
// 回收站还原信息
export const RecycleData = (data: any) => {
  return instance({
    url: '/recycle_data',
    method: 'POST',
    data: data,
  })
}
// 回收站删除
export const deteleRecycleData = (data: any) => {
  return instance({
    url: '/detele_recycle_data',
    method: 'POST',
    data: data,
  })
}
// 撤回申请
export const WithdrawData = (data: any) => {
  return instance({
    url: '/withdraw_data',
    method: 'POST',
    data: data,
  })
}
// 再次申请
export const ReWithdrawData = (data: any) => {
  return instance({
    url: '/rewithdraw_data',
    method: 'POST',
    data: data,
  })
}
