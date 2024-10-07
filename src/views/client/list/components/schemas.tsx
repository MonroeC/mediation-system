import { getDictTypeByType } from '@/utils/common';

export const clientSchemas: any[] = [
  {
    field: 'type',
    component: 'Select',
    label: '类型',
    colProps: {
      span: 11,
    },
    required: true,
    componentProps: {
      options: getDictTypeByType('entrust_customer_type'),
    },
  },
  {
    field: 'name',
    component: 'Input',
    label: ' 名称',
    colProps: {
      span: 11,
      offset: 1,
    },
    required: true,
  },
  {
    field: 'orgCode',
    component: 'Input',
    label: '组织机构代码',
    colProps: {
      span: 11,
    },
    required: true,
  },
  {
    field: 'personLegal',
    component: 'Input',
    label: '法定代表人',
    colProps: {
      span: 11,
      offset: 1,
    },
    required: true,
  },
  {
    field: 'orgAddress',
    component: 'Input',
    label: '机构所在地',
    colProps: {
      span: 11,
    },
    required: true,
  },
  {
    field: 'personLegalPhoneNumber',
    component: 'Input',
    label: '法定代表人手机号码',
    colProps: {
      span: 11,
      offset: 1,
    },
    required: true,
    rules: [
      {
        pattern: /^1[3456789]\d{9}$/,
        message: '请输入正确的手机号码',
      },
    ],
  },
  {
    field: 'personContact',
    component: 'Input',
    label: '联系人',
    colProps: {
      span: 11,
    },
  },
  {
    field: 'personContactPhoneNumber',
    component: 'Input',
    label: '联系号码',
    colProps: {
      span: 11,
      offset: 1,
    },
    rules: [
      {
        pattern: /^1[3456789]\d{9}$/,
        message: '请输入正确的手机号码',
      },
    ],
  },
  {
    field: 'repaymentAccount',
    component: 'Input',
    label: '还款账号',
    colProps: {
      span: 11,
    },
  },
  {
    field: 'cooperationPeriod',
    component: 'DatePicker',
    label: '合作期限',
    colProps: {
      span: 11,
      offset: 1,
    },
    required: true,
  },
  {
    field: 'repaymentBank',
    component: 'Input',
    label: '还款银行名称',
    colProps: {
      span: 11,
    },
  },
  {
    field: 'remark',
    component: 'Input',
    label: '备注',
    colProps: {
      span: 11,
      offset: 1,
    },
  },
];

export const clientDetailSchemas: any[] = [
  {
    field: 'type',
    label: '类型',
  },
  {
    field: 'name',
    label: ' 名称',
  },
  {
    field: 'orgCode',
    label: '组织机构代码',
  },
  {
    field: 'personLegal',
    label: '法定代表人',
  },
  {
    field: 'orgAddress',
    label: '机构所在地',
  },
  {
    field: 'personLegalPhoneNumber',
    label: '法定代表人手机号码',
  },
  {
    field: 'personContact',
    label: '联系人',
  },
  {
    field: 'personContactPhoneNumber',
    label: '联系号码',
  },
  {
    field: 'repaymentAccount',
    label: '还款账号',
  },
  {
    field: 'cooperationPeriod',
    label: '合作期限',
  },
  {
    field: 'repaymentBank',
    label: '还款银行名称',
  },
  {
    field: 'remark',
    label: '备注',
  },
];
