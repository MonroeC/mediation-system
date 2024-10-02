import { FormProps, BasicColumn } from '@/components/Table';
import { getDictTypeByType } from '@/utils/common';
import { entrustCustomerQueryTagList } from '@/api/biz/client';

const dictTypeSimpleList = JSON.parse(localStorage.getItem('dictTypeSimpleList') || '[]');

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

export function getFormConfig({ refresh }): Partial<FormProps> {
  return {
    labelWidth: 60,
    showActionButtonGroup: false,
    autoSubmitOnEnter: true,
    schemas: [
      {
        field: `nameOrCode`,
        component: 'Input',
        colProps: {
          span: 8,
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
          span: 8,
        },
        componentProps: {
          placeholder: '请选择',
          options: getDictTypeByType('entrust_customer_type'),
          onChange: (e, v) => {
            console.log('Select====>:', e, v);
            refresh();
          },
        },
      },
      {
        field: `tags`,
        component: 'ApiSelect',
        label: '标签',
        colProps: {
          span: 8,
        },
        /** 远程加载数据 */
        componentProps: {
          placeholder: '请选择',
          // options: getDictTypeByType('entrust_customer_type'),
          api: () => entrustCustomerQueryTagList,
          showSearch: true,
          apiSearch: {
            show: true,
            searchName: 'name',
          },
          params: {
            tagName: '',
          },
          afterFetch: (list) => {
            return [
              {
                id: '1',
                name: '标签1',
              },
              {
                id: '2',
                name: '标签2',
              },
            ];
          },
          resultField: 'list',
          labelField: 'name',
          valueField: 'id',
          immediate: true,
          mode: 'tags',
          onChange: () => {
            refresh();
          },
          onOptionsChange: (options) => {
            console.log('get options', options.length, options);
          },
        },
      },
    ],
  };
}
