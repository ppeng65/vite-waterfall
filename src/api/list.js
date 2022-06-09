import request from '@/utils/request'

export const getList = (params) => {
  return request({
    url: '/pexels/list',
    method: 'get',
    params
  })
}
