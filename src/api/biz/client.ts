import { defHttp } from '@/utils/http/axios';

interface IEntrustCustomer {
  id?: string;
  /** 委案方名称 */
  name: string;
  /** 委案方类型 */
  type: string;
  /** 组织机构代码 */
  orgCode: string;
  /** 法定代表人 */
  personLegal: string;
  /** 机构所在地 */
  orgAddress: string;
  /** 法定代表人手机号 */
  personLegalPhoneNumber: string;
  /** 联系人 */
  personContact?: string;
  /** 联系人手机号 */
  personContactPhoneNumber?: string;
  /** 还款账号 */
  repaymentAccount?: string[];
  /** 合作期限 */
  cooperationPeriod: string;
  /** 还款银行 */
  repaymentBank?: string;
  /** 备注 */
  remark?: string;
}

/**
 * @description: 创建委案方
 */
export function entrustCustomerCreate(params: IEntrustCustomer) {
  return defHttp.post({
    url: '/mediation/admin-api/biz/entrust-customer/create',
    params,
  });
}

/**
 * @description: 更新委案方
 */
export function entrustCustomerUpdate(params: IEntrustCustomer) {
  return defHttp.put({
    url: '/mediation/admin-api/biz/entrust-customer/update',
    params,
  });
}

/**
 * @description: 打标
 */
export function entrustCustomerSetTag(params: { entrustCustomerId: string; tagList: string[] }) {
  return defHttp.post({
    url: '/mediation/admin-api/biz/entrust-customer/set-tag',
    params,
  });
}

/**
 * @description: 冻结委案方
 */
export function entrustCustomerFreeze(params: { entrustCustomerIdList: number[]; reason: string }) {
  return defHttp.post({
    url: '/mediation/admin-api/biz/entrust-customer/freeze',
    params,
  });
}

/**
 * @description: 委案方解除冻结审核 通过
 */
export function entrustCustomerAuditFree(params: { entrustCustomerIdList: number[] }) {
  return defHttp.post({
    url: '/mediation/admin-api/biz/entrust-customer/audit-free',
    params,
  });
}

/**
 * @description: 委案方申请解除冻结审核
 */
export function entrustCustomerApplyFree(params: {
  entrustCustomerIdList: number[];
  reason: string;
}) {
  return defHttp.post({
    url: '/mediation/admin-api/biz/entrust-customer/apply-free',
    params,
  });
}

/**
 * @description: 委案方删除
 */
export function entrustCustomerDelete(params: { id: number }) {
  return defHttp.delete({
    url: '/mediation/admin-api/biz/entrust-customer/delete',
    params,
  });
}

/**
 * @description: 获取委案方列表分页
 */
export function entrustCustomerQueryPage(params: {
  /** 委案方名称或编号,空字符代表不过滤 */
  nameOrCode?: string;
  /** 委案方类型 */
  type?: string;
  /** 标签 */
  tags?: string[];
  /** 冻结状态 数据字典 entrust_customer_usable_status */
  usableStatus?: string;
  /** 页码 */
  pageNo: number;
  /** 每页大小 最大 100*/
  pageSize: number;
}) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/entrust-customer-query/page',
    params,
  });
}

/**
 * @description: 获得委案方名称列表
 */
export function entrustCustomerQuerySimpleListByKeyword(params: { keyword?: string }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/entrust-customer-query/simple-list-by-keyword',
    params,
  });
}

/**
 * @description: 获取委案方详情
 */
export function entrustCustomerQueryDetail(params: { entrustCustomerId: string }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/entrust-customer-query/get',
    params,
  });
}

/**
 * @description: 获取委案方标签
 */
export function entrustCustomerQueryTag(params: { entrustCustomerId: string }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/entrust-customer-query/get-entrust-customer-tag',
    params,
  });
}

/**
 * @description: 获得委案方标签列表（前端用于根据标签过滤查询，最多 50 条）
 */
export function entrustCustomerQueryTagList(params: { tagName: string }) {
  return defHttp.get({
    url: '/mediation/admin-api/biz/entrust-customer-query/get-entrust-customer-tag-list',
    params,
  });
}
