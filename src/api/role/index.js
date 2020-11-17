import request from '@/utils/request'

const API_PREFIX = '/api'

// 修改角色
export function updateRole(params) {
  return request({
    method: 'put',
    body: params
  })(`${API_PREFIX}/guodun-userauth/role`)
}

// 新增角色
export function addRole(params) {
  return request({
    method: 'post',
    body: params
  })(`${API_PREFIX}/guodun-userauth/role`)
}

// 删除角色
export function delRole(roleId) {
  return request({
    method: 'delete'
  })(`${API_PREFIX}/guodun-userauth/role/${roleId}`)
}

// 修改角色状态
export function changeRoleState(params) {
  return  request({
    method: 'put',
    body: params
  })(`${API_PREFIX}/guodun-userauth/role/changeStatus`)
}

// 获取菜单权限
export function getMenuProMissIons(roleId) {
  return request({
    method: 'get'
  })(`${API_PREFIX}/guodun-userauth/menu/company/roleMenuTreeselect/${roleId}`)
}