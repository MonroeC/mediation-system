import { defHttp } from '@/utils/http/axios';

/**
 * @description: 下载字典
 */
export function getDictTypeSimpleList() {
  return defHttp.get({
    url: '/mediation/admin-api/system/dict-type/simple-list',
  });
}
