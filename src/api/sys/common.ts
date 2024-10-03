import { defHttp } from '@/utils/http/axios';

/**
 * @description: 下载字典
 */
export function getDictTypeSimpleList() {
  return defHttp.get({
    url: '/mediation/admin-api/system/dict-data/simple-list',
  });
}

/**
 * @description: 获取字典数据
 */

export function getDictDataByType(params: { dictType: string; pageNo: number; pageSize: number }) {
  return defHttp.get({
    url: '/mediation/admin-api/system/dict-data/page',
    params,
  });
}

/**
 * @description: 获取委案方列表
 */

export function entrustCustomerQuerySimpleListByKeyword(params?: { keyword?: string }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/entrust-customer-query/simple-list-by-keyword',
    params,
  });
}

/**
 * @description: 获得当事人精简列表用于枚举查询
 */
export function getPartiesSimpleList(params?: { name?: string }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/parties-query/get-parties-simple-list',
    params,
  });
}

/**
 * @description: 根据用户名称查询用户精简信息列表
 */
export function listSimpleUserByNickname(params?: { nickname?: string }) {
  return defHttp.get({
    url: '/mediation/admin-api/system/user/list-simple-user-by-nickname',
    params,
  });
}
