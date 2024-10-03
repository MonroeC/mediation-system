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
