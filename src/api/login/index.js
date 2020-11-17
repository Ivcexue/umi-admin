import request from '@/utils/request'


// 登录
export function login(params) {
  return request({
    method: 'post',
    body: params,
  })('/api/eseal-usermanage/login');
}

// 获取验证码
export function getCodeImg(params) {
  return request({
    method: 'post',
    body: params
  })('/api/eseal-usermanage/sms/send')
}