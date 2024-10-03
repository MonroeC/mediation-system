import { FormProps, BasicColumn } from '@/components/Table';
import { getDictTypeByType } from '@/utils/common';
import {
  entrustCustomerQuerySimpleListByKeyword,
  getPartiesSimpleList,
  listSimpleUserByNickname,
} from '@/api/sys/common';

export const getColumns: () => BasicColumn[] = () => {
  return [
    {
      title: '案件名称',
      dataIndex: 'lawsuitName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      customRender({ record }) {
        console.log(record.status, 'record.status');
        return getDictTypeByType('lawsuit_status').find((item) => item.value === record.status)
          ?.label;
      },
    },
    {
      title: '案件编号',
      dataIndex: 'lawsuitCode',
    },
    {
      title: '委案编号',
      dataIndex: 'entrustCode',
    },
    {
      title: '案件类型',
      dataIndex: 'lawsuitType',
    },
    {
      title: '标签',
      dataIndex: 'tagList',
    },
    {
      title: '委案方',
      dataIndex: 'entrustCustomerName',
    },
    {
      title: '委案期限',
      dataIndex: 'entrustDeadline',
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
      // TODO: 佣金
      dataIndex: 'commission',
    },
    {
      title: '调解员',
      dataIndex: 'mediationChargeName',
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
console.log(getDictTypeByType('lawsuit_status'), '23');
export function getFormConfig({ refresh }): Partial<FormProps> {
  return {
    labelWidth: 80,
    // showActionButtonGroup: false,
    showResetButton: false,
    showSubmitButton: false,
    autoSubmitOnEnter: true,
    compact: true,
    schemas: [
      {
        field: `lawsuitNameOrCode`,
        component: 'InputSearch',
        colProps: {
          span: 6,
        },
        componentProps: {
          placeholder: '输入案件名称、编号查询',
          onSearch: () => {
            refresh();
          },
        },
      },
      {
        field: `lawsuitFilterRange`,
        component: 'Select',
        label: ' ',
        colProps: {
          span: 4,
        },
        labelWidth: 10,
        defaultValue: 'all',
        componentProps: {
          placeholder: '请选择',
          options: getDictTypeByType('lawsuit_filter_range'),
          onChange: () => {
            refresh();
          },
        },
      },
      {
        field: `statusList`,
        component: 'RadioButtonGroup',
        label: ' ',
        colProps: {
          span: 14,
        },
        labelWidth: 10,
        componentProps: {
          options: [{ label: '全部', value: '' }].concat(getDictTypeByType('lawsuit_status')),
          onChange: () => {
            refresh();
          },
        },
      },
      {
        field: `entrustCustomerIdList`,
        component: 'ApiSelect',
        label: '委案方',
        colProps: {
          span: 6,
        },
        /** 远程加载数据 */
        componentProps: {
          placeholder: '请选择',
          api: () => entrustCustomerQuerySimpleListByKeyword,
          showSearch: true,
          apiSearch: {
            show: true,
            searchName: 'name',
          },
          params: {
            keyword: '',
          },
          afterFetch: (list) => {
            console.log(list, 'list');
          },
          resultField: 'list',
          labelField: 'name',
          valueField: 'id',
          immediate: true,
          mode: 'multiple',
          onChange: () => {
            refresh();
          },
        },
      },
      {
        field: `mediatorIdList`,
        component: 'Select',
        label: '案件类型',
        colProps: {
          span: 6,
        },
        componentProps: {
          options: getDictTypeByType('lawsuit_type'),
          onChange: () => {
            refresh();
          },
        },
      },
      {
        field: `entrustCustomerIdList`,
        component: 'ApiSelect',
        label: '调解员',
        colProps: {
          span: 6,
        },
        /** 远程加载数据 */
        componentProps: {
          placeholder: '请选择',
          api: () => listSimpleUserByNickname,
          showSearch: true,
          apiSearch: {
            show: true,
            searchName: 'name',
          },
          params: {
            keyword: '',
          },
          afterFetch: (list) => {
            console.log(list, 'list');
          },
          resultField: 'list',
          labelField: 'name',
          valueField: 'id',
          immediate: true,
          mode: 'multiple',
          onChange: () => {
            refresh();
          },
        },
      },
      {
        field: `mediatorChargeIdList`,
        component: 'ApiSelect',
        label: '负责人',
        colProps: {
          span: 6,
        },
        /** 远程加载数据 */
        componentProps: {
          placeholder: '请选择',
          api: () => listSimpleUserByNickname,
          showSearch: true,
          apiSearch: {
            show: true,
            searchName: 'name',
          },
          params: {
            keyword: '',
          },
          afterFetch: (list) => {
            console.log(list, 'list');
          },
          resultField: 'list',
          labelField: 'name',
          valueField: 'id',
          immediate: true,
          mode: 'multiple',
          onChange: () => {
            refresh();
          },
        },
      },
      {
        field: `partiesList`,
        component: 'ApiSelect',
        label: '当事人',
        colProps: {
          span: 6,
        },
        /** 远程加载数据 */
        componentProps: {
          placeholder: '请选择',
          api: () => getPartiesSimpleList,
          showSearch: true,
          apiSearch: {
            show: true,
            searchName: 'name',
          },
          params: {
            keyword: '',
          },
          afterFetch: (list) => {
            console.log(list, 'list');
          },
          resultField: 'list',
          labelField: 'name',
          valueField: 'id',
          immediate: true,
          mode: 'multiple',
          onChange: () => {
            refresh();
          },
        },
      },
      {
        field: `tagList`,
        component: 'Select',
        label: '标签',
        colProps: {
          span: 6,
        },
        componentProps: {
          options: getDictTypeByType('lawsuit_type'),
          mode: 'multiple',
          onChange: () => {
            refresh();
          },
        },
      },
      {
        field: `showFreeze`,
        component: 'Checkbox',
        label: '显示已冻结',
        colProps: {
          span: 6,
        },
        // labelWidth: 100,
        componentProps: {
          onChange: () => {
            refresh();
          },
        },
      },
      // {
      //   field: `tags`,
      //   component: 'ApiSelect',
      //   label: '标签',
      //   colProps: {
      //     span: 8,
      //   },
      //   /** 远程加载数据 */
      //   componentProps: {
      //     placeholder: '请选择',
      //     // options: getDictTypeByType('entrust_customer_type'),
      //     api: () => entrustCustomerQueryTagList,
      //     showSearch: true,
      //     apiSearch: {
      //       show: true,
      //       searchName: 'name',
      //     },
      //     params: {
      //       tagName: '',
      //     },
      //     afterFetch: (list) => {
      //       return [
      //         {
      //           id: '1',
      //           name: '标签1',
      //         },
      //         {
      //           id: '2',
      //           name: '标签2',
      //         },
      //       ];
      //     },
      //     resultField: 'list',
      //     labelField: 'name',
      //     valueField: 'id',
      //     immediate: true,
      //     mode: 'tags',
      //     onChange: () => {
      //       refresh();
      //     },
      //     onOptionsChange: (options) => {
      //       console.log('get options', options.length, options);
      //     },
      //   },
      // },
    ],
  };
}
