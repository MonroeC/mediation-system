import { getDictTypeByType } from '@/utils/common';
import { entrustCustomerQuerySimpleListByKeyword } from '@/api/sys/common';

/** 基础信息 */
export const baseInfoFormSchema: any = [
  {
    field: 'lawsuitName',
    label: '案件名称',
    component: 'Input',
    componentProps: {
      placeholder: '留空提交后自动生成',
    },
  },
  {
    field: 'entrustCode',
    label: '委案案号',
    component: 'Input',
    componentProps: {
      disabled: true,
      placeholder: '留空提交后自动生成',
    },
  },
  {
    field: 'entrustDate',
    label: '委案日期',
    component: 'DatePicker',
    // componentProps: {
    //   format: 'YYYY-MM-DD',
    // },
    required: true,
  },
  {
    field: 'entrustDeadline',
    label: '委案期限',
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
    },
    required: true,
  },
  {
    field: 'lawsuitType',
    label: '案件类型',
    component: 'Select',
    required: true,
    componentProps: {
      options: getDictTypeByType('lawsuit_type'),
    },
  },
  {
    field: 'mediationTarget',
    label: '调解目标',
    component: 'Select',
    // required: true,
    defaultValue: getDictTypeByType('mediation_target')?.[0]?.value,
    componentProps: {
      options: getDictTypeByType('mediation_target'),
      disabled: true,
    },
  },
  {
    field: 'arrearsTotal',
    label: '欠款总额',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'mediationCommission',
    label: '调解佣金',
    component: 'InputNumber',
    required: true,
    componentProps: {
      addonAfter: '%',
      min: 1,
      max: 99,
    },
  },
  {
    field: 'mediationIdentity',
    label: '调解身份',
    component: 'Select',
    required: true,
    componentProps: {
      options: getDictTypeByType('mediation_identity'),
    },
  },
  {
    field: 'repaymentLowestDesc',
    label: '最低还款金额',
    component: 'Input',
  },
  {
    field: 'repaymentLongnum',
    label: '最长还款期数',
    component: 'Input',
  },
  {
    field: 'remark',
    label: '备注',
    component: 'Input',
    componentProps: {
      maxLength: 100,
    },
  },
];

/** 案件信息 */
export const caseInfoFormSchema: any = [
  {
    field: '逾期日期',
    label: '逾期日期',
    component: 'DatePicker',
    defaultValue: '',
    componentProps: {
      format: 'YYYY-MM-DD',
    },
  },
  {
    field: '开卡日期',
    label: '开卡日期',
    component: 'DatePicker',
    defaultValue: '',
    componentProps: {
      format: 'YYYY-MM-DD',
    },
  },
  {
    field: '卡号',
    label: '卡号',
    component: 'Input',
    // 银行卡号校验
    rules: [
      {
        required: true,
        message: '请输入银行卡号',
      },
      {
        pattern: /^([1-9]{1})(\d{15}|\d{18})$/,
        message: '请输入正确的银行卡号',
      },
    ],
  },
  {
    field: '首张激活卡号',
    label: '首张激活卡号',
    component: 'Input',
    // 银行卡号校验
    rules: [
      {
        required: true,
        message: '请输入银行卡号',
      },
      {
        pattern: /^([1-9]{1})(\d{15}|\d{18})$/,
        message: '请输入正确的银行卡号',
      },
    ],
  },
  // TODO:真账号：此字段仅支持平安银行，默认不展示此项，通过填写的信用卡号判断是否为平安银行，是则展示此项字段且为必填项；
  {
    field: '真账号',
    label: '真账号',
    component: 'Input',
    required: true,
    // 银行卡号校验
    rules: [
      {
        required: true,
        message: '请输入银行卡号',
      },
      {
        pattern: /^([1-9]{1})(\d{15}|\d{18})$/,
        message: '请输入正确的银行卡号',
      },
    ],
  },
  {
    field: '息费暂计日',
    label: '息费暂计日',
    component: 'Select',
    componentProps: {
      options: getDictTypeByType('lawsuit_type'),
    },
  },
  {
    field: '激活日期',
    label: '激活日期',
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
    },
  },
  {
    field: '案件编号',
    label: '案件编号',
    component: 'Input',
  },
  {
    field: '账单地址',
    label: '账单地址',
    component: 'Input',
  },
  {
    field: '预定送达地址',
    label: '预定送达地址',
    component: 'Input',
  },
  {
    field: '用印时间',
    label: '用印时间',
    component: 'DatePicker',
  },
  {
    field: '所函号',
    label: '所函号',
    component: 'Input',
  },
  {
    field: '案件管辖依据',
    label: '案件管辖依据',
    component: 'Select',
    componentProps: {
      options: getDictTypeByType('lawsuit_gov_place'),
    },
  },
  {
    field: '管辖地址',
    label: '管辖地址',
    component: 'Input',
  },
];

/** 标的信息 */
export const subjectInfoFormSchema: any = [
  {
    field: '本金类型',
    label: '本金类型',
    component: 'Select',
    defaultValue: getDictTypeByType('subject_principal_type')?.[0]?.value,
    componentProps: {
      options: getDictTypeByType('subject_principal_type'),
      disabled: true,
    },
  },
  {
    field: '开卡日期',
    label: '开卡日期',
    required: true,
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
    },
  },
  {
    field: '利息',
    label: '利息',
    required: true,
    component: 'InputNumber',
  },
  {
    field: '违约金',
    label: '违约金',
    required: true,
    component: 'InputNumber',
  },
  {
    field: '分期手续费',
    label: '分期手续费',
    required: true,
    component: 'InputNumber',
  },
  {
    field: '年费',
    label: '年费',
    required: true,
    component: 'InputNumber',
  },
  {
    field: '律师费',
    label: '律师费',
    required: true,
    component: 'InputNumber',
  },
];

/** 法院信息 */
export const courtInfoFormSchema: any = [
  {
    field: '法院名称',
    label: '法院名称',
    component: 'Input',
  },
  {
    field: '判决生效时间',
    label: '判决生效时间',
    component: 'DateTimePicker',
  },
  {
    field: '开庭时间',
    label: '开庭时间',
    component: 'DateTimePicker',
  },
  {
    field: '开庭地点',
    label: '开庭地点',
    component: 'Input',
  },
  {
    field: '判决时间',
    label: '判决时间',
    required: true,
    component: 'DateTimePicker',
  },
  {
    field: '案件编号信息',
    label: '案件编号信息',
    component: 'Select',
    componentProps: {
      options: getDictTypeByType('court_lawsuit_code_info'),
    },
  },
  {
    field: '民初案号',
    label: '民初案号',
    component: 'Input',
  },
  {
    field: '执行案号',
    label: '执行案号',
    component: 'Input',
  },
  {
    field: '民再案号',
    label: '民再案号',
    component: 'Input',
  },
  {
    field: '财保案号',
    label: '财保案号',
    component: 'Input',
  },
  {
    field: '书记员姓名',
    label: '书记员姓名',
    component: 'Input',
  },
  {
    field: '书记员联系号码',
    label: '书记员联系号码',
    component: 'Input',
  },
  {
    field: '法官姓名',
    label: '法官姓名',
    component: 'Input',
  },
  {
    field: '法官联系号码',
    label: '法官联系号码',
    component: 'Input',
  },
  {
    field: '案件受理费',
    label: '案件受理费',
    component: 'InputNumber',
  },
  {
    field: '保全费',
    label: '保全费',
    component: 'InputNumber',
  },
  {
    field: '公告费',
    label: '公告费',
    component: 'InputNumber',
  },
  {
    field: '标的本金',
    label: '标的本金',
    component: 'InputNumber',
  },
];

/** 委案方信息 */
export const clientInfoFormSchema: any = [
  {
    field: 'entrustCustomerId',
    label: '选择委案方',
    component: 'ApiSelect',
    required: true,
    componentProps: {
      placeholder: '请选择',
      api: entrustCustomerQuerySimpleListByKeyword,
      showSearch: true,
      apiSearch: {
        show: true,
        searchName: 'name',
      },
      params: {
        keyword: '',
      },
      afterFetch: (list) => {},
      resultField: 'list',
      labelField: 'name',
      valueField: 'id',
      immediate: true,
    },
  },
];

/** 代理人信息 */
export const entrustAgentFormSchema: any = [
  {
    field: '代理人姓名',
    label: '代理人姓名',
    component: 'entrustAgentName',
  },
  {
    field: '身份证号',
    label: '身份证号',
    component: 'entrustAgentIdentityNo',
  },
  {
    field: 'entrustAgentOccupationalNo	',
    label: '职业证书',
    component: 'Input',
  },
  {
    field: 'entrustAgentPhoneNumber',
    label: '手机号码',
    component: 'Input',
  },
  {
    field: 'entrustAgentAuthType',
    label: '授权类型',
    component: 'Select',
    componentProps: {
      options: getDictTypeByType('entrust_agent_auth_type'),
    },
  },
  {
    field: 'entrustAgentOrgName',
    label: '所属机构',
    component: 'Input',
  },
  {
    field: 'entrustAgentOrgAddress',
    label: '所属机构地址',
    component: 'Input',
  },
];

/** 被送达人信息 */
export const entrustSenderFormSchema: any = [
  {
    field: 'entrustSenderName',
    label: '被送达人',
    component: 'Input',
  },
  {
    field: 'entrustSenderIdentityNo',
    label: '身份证号',
    component: 'Input',
  },
  {
    field: 'entrustSenderPhoneNumber',
    label: '送达手机号',
    component: 'Input',
  },
  {
    field: 'entrustSenderEmail',
    label: '送达邮箱',
    component: 'Input',
  },
  {
    field: 'entrustSenderAddress',
    label: '送达地址',
    component: 'Input',
  },
];

const colProps = {
  xl: 8,
  md: 12,
  xxl: 6,
};
/** 当事人信息 */
export const partiesFormSchema: any = [
  // {
  //   field: 'name',
  //   label: '选择当事人',
  //   component: 'Select',
  //   colProps,
  //   required: true,
  //   componentProps: {
  //     options: getDictTypeByType('parties_type'),
  //   },
  // },
  {
    field: 'partiesType',
    label: '当事人类型',
    component: 'Select',
    required: true,
    colProps,
    componentProps: {
      options: getDictTypeByType('parties_type'),
    },
  },
  {
    field: 'name',
    label: '姓名',
    colProps,
    required: true,
    component: 'Input',
  },
  {
    field: 'gender',
    label: '性别',
    component: 'Select',
    colProps,
    required: true,
    componentProps: {
      options: getDictTypeByType('system_user_sex'),
    },
  },
  {
    field: 'nation',
    label: '民族',
    colProps,
    required: true,
    component: 'Input',
  },
  {
    field: 'birthDate',
    label: '出生日期',
    required: true,
    colProps,
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
    },
  },
  {
    field: 'identityNo',
    label: '身份证号',
    required: true,
    colProps,
    component: 'Input',
  },
  {
    field: 'identityNoPeriod',
    label: '身份证有效期',
    colProps,
    component: 'DatePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
    },
  },
  {
    field: 'phoneNumber',
    label: '手机号码',
    required: true,
    colProps,
    component: 'Input',
  },
  {
    field: 'homeAddress',
    label: '家庭地址',
    colProps,
    component: 'Input',
  },
  {
    field: 'registrationAddress',
    label: '户籍地址',
    required: true,
    colProps,
    component: 'Input',
  },
  {
    field: 'companyAddress',
    label: '单位地址',
    required: true,
    colProps,
    component: 'Input',
  },
  {
    field: 'billAddress',
    label: '账单地址',
    required: true,
    colProps,
    component: 'Input',
  },
  {
    field: 'divider-api-select',
    component: 'Divider',
    label: '关联信息',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'relatedComponyName',
    label: '工作单位',
    colProps,
    component: 'Input',
  },
  {
    field: 'relatedComponyContact',
    label: '工作单位联系信息',
    colProps,
    component: 'Input',
  },
  {
    field: 'relatedDept',
    label: '部门',
    colProps,
    component: 'Input',
  },
  {
    field: 'relatedJob',
    label: '职务',
    colProps,
    component: 'Input',
  },
  {
    field: 'relatedWorkYears',
    label: '工龄',
    colProps,
    component: 'InputNumber',
  },
  {
    field: 'relatedYearincome',
    label: '年收入',
    colProps,
    component: 'InputNumber',
  },
  {
    field: 'relatedKinName',
    label: '直系亲属姓名',
    colProps,
    component: 'Input',
  },
  {
    field: 'relatedKinShip',
    label: '直系人与当事人关系',
    colProps,
    component: 'Input',
  },
  {
    field: 'relatedKinContact',
    label: '直系人联系方式',
    colProps,
    component: 'Input',
  },
  {
    field: 'relatedNonkinName',
    label: '非直系亲属姓名',
    colProps,
    component: 'Input',
  },
  {
    field: 'relatedNokinShip',
    label: '非直系人与当事人关系',
    colProps,
    component: 'Input',
  },
  {
    field: 'relatedNonkinContact',
    label: '非直系人联系方式',
    colProps,
    component: 'Input',
  },
  {
    field: 'relatedMarriage',
    label: '婚姻',
    colProps,
    component: 'Select',
    componentProps: {
      options: getDictTypeByType('system_user_marital_status'),
    },
  },
  {
    field: 'relatedDegree',
    label: '教育程度',
    colProps,
    component: 'Select',
    componentProps: {
      options: getDictTypeByType('system_user_marital_status'),
    },
  },
  {
    field: 'relatedEmail',
    label: '邮箱',
    colProps,
    component: 'Input',
  },
  {
    field: 'relatedQq',
    label: 'QQ',
    colProps,
    component: 'Input',
  },
  {
    field: 'relatedWeixin',
    label: '微信',
    colProps,
    component: 'Input',
  },
  {
    field: 'relatedDingtalk',
    label: '钉钉',
    colProps,
    component: 'Input',
  },
  {
    field: 'relatedExecuteInfo',
    label: '执行信息',
    colProps,
    component: 'Input',
  },
  {
    field: 'relatedLitigationInfo',
    label: '涉诉信息',
    colProps,
    component: 'Input',
  },
];
