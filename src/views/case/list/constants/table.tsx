import { BasicColumn } from '@/components/Table';

export const getColumns: () => BasicColumn[] = () => {
  return [
    {
      title: '案件名称',
      dataIndex: 'name',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '案件编号',
      dataIndex: 'caseNumber',
    },
    {
      title: '委案编号',
      dataIndex: 'commissionNumber',
    },
    {
      title: '案件类型',
      dataIndex: 'type',
    },
    {
      title: '标签',
      dataIndex: 'tags',
    },
    {
      title: '委案方',
      dataIndex: 'client',
    },
    {
      title: '委案期限',
      dataIndex: 'commissionDeadline',
    },
    {
      title: '调解身份',
      dataIndex: 'mediationIdentity',
    },
    {
      title: '委案日期',
      dataIndex: 'commissionDate',
    },
    {
      // 显示佣金比例
      title: '佣金',
      dataIndex: 'commission',
    },
    {
      title: '调解员',
      dataIndex: 'mediator',
    },
    {
      // 备注：显示备注，单行显示，超出…。鼠标停留浮窗显示全部；
      title: '备注',
      dataIndex: 'remark',
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 160,
      fixed: 'right',
    },
  ];
};

export interface SearchConfig {
  // 搜索框配置
  searchInput: {
    placeholder: string;
  };
  // 搜索分类配置
  options: {
    label: string;
    value: string;
  }[];
  // 搜索按钮配置
  buttons: {
    label: '全部' | '待分配' | '调解中' | '结案中' | '已结案';
    value: 'all' | 'wait' | 'mediation' | 'closing' | 'closed';
  }[];
}

// 获取搜索分类options
export const getSearch: () => SearchConfig = () => {
  return {
    searchInput: {
      placeholder: '输入案件名称、编号查询',
    },
    options: [
      {
        label: '我的案件',
        value: 'myCase',
      },
      {
        label: '全部案件',
        value: 'allCase',
      },
    ],
    buttons: [
      {
        label: '全部',
        value: 'all',
      },
      {
        label: '待分配',
        value: 'wait',
      },
      {
        label: '调解中',
        value: 'mediation',
      },
      {
        label: '结案中',
        value: 'closing',
      },
      {
        label: '已结案',
        value: 'closed',
      },
    ],
  };
};
