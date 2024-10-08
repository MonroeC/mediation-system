import { defHttp } from '@/utils/http/axios';

/**
 * @description: 获取案件分页列表
 */
export function lawsuitQueryPage(params: {
  /** 案件名称或编号 */
  lawsuitNameOrCode?: string;
  /** 案件过滤范围（数据字典：lawsuit_filter_range） */
  lawsuitFilterRange: string;
  /** 状态，空列表代表不过滤，（数据字典《entrust_status》） */
  statusList?: string[];
  /** 案件类型，空字符串代表不过滤，（数据字典《lawsuit_type》） */
  lawsuitType?: string;
  /** 委案方列表，空列表代表不过滤，委案方id列表 */
  entrustCustomerIdList?: number[];
  /** 显示已冻结 */
  showFreeze?: boolean;
  /** 调解员列表，空列表代表不过滤，用户id列表 */
  mediatorIdList?: number[];
  /** 调解主管（负责人）列表，空列表代表不过滤，用户id列表 */
  mediatorChargeIdList?: number[];
  /** 标签列表，空列表代表不过滤 */
  tagList?: string[];
  /** 当事人列表，空列表代表不过滤 */
  partiesList?: string[];
  pageNo: number;
  pageSize: number;
}) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/lawsuit-query/page',
    params,
  });
}

/**
 * @description: 新建案件
 */

export function lawsuitCreate(params: any) {
  return defHttp.post({
    url: '/mediation/admin-api/biz/lawsuit/create',
    params,
  });
}

/** 更新案件 */
export function lawsuitUpdate(params: any) {
  return defHttp.put({
    url: '/mediation/admin-api/biz/lawsuit/update',
    params,
  });
}

/** 案件确认 */
export function lawsuitConfirm(params: { lawsuitIdList: any[]; mediationCharge: number }) {
  return defHttp.post({
    url: '/mediation/admin-api/biz/lawsuit/confirm',
    params,
  });
}

/** 案件指派 */
export function lawsuitAssign(params: any) {
  return defHttp.post({
    url: '/mediation/admin-api/biz/lawsuit/assign',
    params,
  });
}

/** 申请展期 */
export function lawsuitApplyExtensionDeadline(params: {
  lawsuitIdList: any[];
  entrustDeadline: string;
  reason: string;
}) {
  return defHttp.post({
    url: '/mediation/admin-api/biz/lawsuit/apply-extend-deadline',
    params,
  });
}

/** 案件冻结 */
export function lawsuitFreeze(params: { lawsuitIdList: any[] }) {
  return defHttp.post({
    url: '/mediation/admin-api/biz/lawsuit/freeze',
    params,
  });
}

/** 案件打标 */
export function lawsuitSetTag(params: { tagList: []; lawsuitId: any[] }) {
  return defHttp.post({
    url: '/mediation/admin-api/biz/lawsuit/set-tag',
    params,
  });
}

/** 申请结案 */
export function lawsuitApplyClose(params: {
  /** 案件 id 列表 */
  lawsuitIdList: any[];
  /** 结案类型 */
  closeType: 'success' | 'fail' | 'stage';
  /** 支付金额: 调节成功有效 */
  payAmount: number;
  /** 支付日期: 调节成功有效 */
  payDate: string;
  /** 分期列表: 分期有效 */
  stageList: any[];
  /** 上传凭据列表 */
  attachmentList: string[];
  /** 备注 */
  remark?: string;
}) {
  return defHttp.post({
    url: '/mediation/admin-api/biz/lawsuit/apply-close',
    params,
  });
}

/** 案件详情 */
export function lawsuitDetail(params: { lawsuitId: number }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/lawsuit-query/get',
    params,
  });
}

/** 获取案件标签 */
export function getLawsuitTag(params: { lawsuitId: number }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/lawsuit-query/get-lawsuit-tag',
    params,
  });
}

/** 查看案件工单： 穿案件工单 id */
export function lawsuitWorkOrder(params: { lawsuitOrderId: number }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/lawsuit-query/get-lawsuit-order',
    params,
  });
}

/** 查看案件工单： 传案件 id */
export function lawsuitWorkOrderbyLawsuitId(params: { lawsuitId: number }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/lawsuit-query/get-lawsuit-order-by-lawsuit-id',
    params,
  });
}

/** 获得案件工单列表 */
export function getLawsuitOrderPage(params: {
  lawsuitId: number;
  pageNo: number;
  pageSize: number;
}) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/lawsuit-query/get-lawsuit-order-page',
    params,
  });
}

/** 获得调解记录 */
export function getLawsuitMediationAction(params: { lawsuitId: number }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/lawsuit-query/get-lawsuit-mediation-action',
    params,
  });
}

/** 获得案件跟进记录 */
export function getLawsuitFollowAction(params: { lawsuitId: number }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/lawsuit-query/get-lawsuit-follow-action',
    params,
  });
}

/** 保存调解笔记 */
export function setMediationRemark(params: { lawsuitId: number; mediationRemark: string }) {
  return defHttp.post({
    url: '/mediation/admin-api/biz/lawsuit/set-mediation-remark',
    params,
  });
}

/** 结案审核-同意 */
export function lawsuitCloseAgree(params: { lawsuitId: number; agree: boolean }) {
  return defHttp.post({
    url: '/mediation/admin-api/biz/lawsuit/audit-close',
    params,
  });
}
