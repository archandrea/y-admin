import { get, post } from '@/http/request'
import { user } from '@/api/PATH'

// 成员API

/**
 * 新增分类
 * @param {分类内容[type,name]} data
 */
export function addClass(data) {
  return post(user.addClass, data)
}

/**
 * 删除分类
 * @param {分类ID} id
 */
export function deleteClass(id) {
  return post(user.deleteClass, { id: id })
}

/**
 * 更新分类
 * @param {分类内容[type,name]} data
 */
export function updateClass(data) {
  return post(user.updateClass, data)
}
