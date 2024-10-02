import { defHttp } from '@/utils/http/axios';

/**
 * @description: 获取案件详情
 */
export function getCaseDetail(params: { lawsuitId: string; id: string }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/lawsuit-query/get',
    params,
  });
}

/**
 * @description: 获取案件标签
 */
export function getLawsuitTag(params: { lawsuitId: string }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/lawsuit-query/get-lawsuit-tag',
    params,
  });
}

/**
 * @description: 获得标签列表（前端用于根据标签过滤查询，最多 50 条）
 */
export function getLawsuitTagList(params: { tagName: string }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/lawsuit-query/get-lawsuit-tag-list',
    params,
  });
}

/**
 * @description: 查看案件工单
 */
export function getLawsuitOrder(params: { lawsuitOrderId: number }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/lawsuit-query/get-lawsuit-order',
    params,
  });
}

/**
 * @description: 获得案件工单分页
 */
export function getLawsuitOrderPage(params: { lawsuitId: number }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/lawsuit-query/get-lawsuit-order-page',
    params,
  });
}

/**
 * @description: 查看案件工单
 */
export function getLawsuitOrderByLawsuitId(params: { lawsuitId: number }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/lawsuit-query/get-lawsuit-order-by-lawsuit-id',
    params,
  });
}

/**
 * @description: 获取调解记录
 */
export function getLawsuitMediationAction(params: { lawsuitId: number }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/lawsuit-query/get-lawsuit-mediation-action',
    params,
  });
}

/**
 * @description: 获取案件跟进记录
 */
export function getLawsuitFollowAction(params: { lawsuitId: number }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/lawsuit-query/get-lawsuit-follow-action',
    params,
  });
}
