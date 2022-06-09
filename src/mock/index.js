import Mockjs from 'mockjs'
import getCategory from './modules/getCategory'
import getTheme from './modules/getThemes'
import getList from './modules/getList'
import getRegister from './modules/getRegister'
import getLoginMsg from './modules/getLoginMsg'

// 获取菜单
Mockjs.mock('/api/category', getCategory)
// 获取搜索热门
Mockjs.mock('/api/pexels/themes', getTheme)
// 获取列表图片
Mockjs.mock(new RegExp('/api/pexels/list.*'), getList)
// 注册用户
Mockjs.mock('/api/sys/register', 'post', getRegister)
// 获取登录信息
Mockjs.mock('/api/sys/login', 'post', getLoginMsg)
