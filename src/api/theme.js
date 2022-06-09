import request from '@/utils/request'

export const getThemes = () => {
  return request({
    url: '/pexels/themes',
    method: 'get'
  })
}
