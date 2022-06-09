import request from '@/utils/request'

// 注册
// {"username":"123456789-","password":"e10adc3949ba59abbe56e057f20f883e"}
export const getRegister = (data) => {
  return request({
    url: '/sys/register',
    method: 'POST',
    data
  })
}

// 登录
// {"username":"123456789-","password":"e10adc3949ba59abbe56e057f20f883e","loginType":"username"}
export const getLogin = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
