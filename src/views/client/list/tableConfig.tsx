import { FormProps, BasicColumn } from '@/components/Table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '名称',
      dataIndex: 'id',
      fixed: 'left',
      width: 200,
      ellipsis: true,
    },
    {
      title: '编号',
      dataIndex: 'name',
      width: 150,
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'address',
    },
    {
      title: '类型',
      dataIndex: 'no',
      width: 150,
    },
    {
      title: '委案数量',
      width: 150,
      dataIndex: 'beginTime',
    },
    {
      title: '待调解数',
      width: 150,
      dataIndex: 'endTime',
    },
    {
      title: '已支付佣金',
      width: 150,
      dataIndex: 'endTime',
    },
    {
      title: '待结算佣金',
      width: 150,
      dataIndex: 'endTime',
    },
    {
      title: '联系人',
      width: 150,
      dataIndex: 'endTime',
    },
    {
      title: '联系号码',
      width: 150,
      dataIndex: 'endTime',
    },
    {
      title: '合作期限',
      width: 150,
      dataIndex: 'endTime',
    },
    {
      title: '标签',
      width: 150,
      dataIndex: 'endTime',
    },
    {
      title: '操作',
      width: 150,
      dataIndex: 'action',
      key: 'action',
    },
  ];
}

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    showActionButtonGroup: false,
    schemas: [
      {
        field: `name`,
        component: 'Input',
        colProps: {
          xl: 6,
          xxl: 6,
        },
        componentProps: {
          placeholder: '输入名称关键词或编号',
        },
      },
      {
        field: `type`,
        component: 'Select',
        label: '类型',
        colProps: {
          xl: 6,
          xxl: 6,
        },
        defaultValue: 'all',
        componentProps: {
          placeholder: '请选择',
          options: [
            {
              label: '全部',
              value: 'all',
            },
          ],
        },
      },
      {
        field: `tag`,
        component: 'Select',
        label: '标签',
        colProps: {
          xl: 6,
          xxl: 6,
        },
        componentProps: {
          placeholder: '请选择',
          options: [
            {
              label: '全部',
              value: 'all',
            },
          ],
        },
      },
      // {
      //   field: `field11`,
      //   label: `Slot示例`,
      //   slot: 'custom',
      //   colProps: {
      //     xl: 12,
      //     xxl: 8,
      //   },
      // },
    ],
  };
}
