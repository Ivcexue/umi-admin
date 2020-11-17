import request from '@/utils/request'

// 获取路由
export function getRoutes() {
  return request({
    method: 'get',
  })('/api/guodun-userauth/user/getRouters');
}