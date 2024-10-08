<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Space>
          <Button type="primary" @click="handleAdd">+ 新建案件</Button>
          <Button type="primary" @click="handleImport">+ 导入案件</Button>
          <Button @click="() => handleOpenCaseConfirm(records)" :disabled="!records.length"
            >案件确认</Button
          >
          <Button @click="() => handleOpenCaseAssign(records)" :disabled="!records.length"
            >案件指派</Button
          >
          <Button @click="() => handleOpenCaseExtension(records)" :disabled="!records.length"
            >申请展期</Button
          >
          <Button @click="() => handleOpenSetTag(records)" :disabled="!records.length">打标</Button>
          <Button @click="handleOpenFreeze" :disabled="!records.length">冻结</Button>
          <Button @click="() => handleOpenCaseClose(records)" :disabled="!records.length"
            >结案</Button
          >
        </Space>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="actions(record)" style="width: 200px" />
        </template>
      </template>
    </BasicTable>

    <CaseConfirm @register="registerCaseConfirm" :ok="refresh" />
    <CaseAssign @register="registerCaseAssign" :ok="refresh" />
    <CaseClose @register="registerCaseClose" :ok="refresh" />
    <ApplyExtension @register="registerApplyExtension" :ok="refresh" />
    <Freeze @register="registerFreeze" :ok="refresh" />
    <SetTag @register="registerSetTag" :ok="refresh" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch, computed, onMounted, reactive } from 'vue';
  import { Space, Button } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getColumns, getFormConfig } from './constants/table';
  import { useModal } from '@/components/Modal';
  import CaseConfirm from '/@/views/case/list/components/CaseConfirm.vue';
  import CaseAssign from '/@/views/case/list/components/CaseAssign.vue';
  import CaseClose from '/@/views/case/list/components/CaseClose.vue';
  import Freeze from '/@/views/case/list/components/Freeze.vue';
  import SetTag from '/@/views/case/list/components/SetTag.vue';
  import ApplyExtension from '/@/views/case/list/components/ApplyExtension.vue';
  import { lawsuitQueryPage, getTagList } from '@/api/biz/case';
  import { useGo } from '@/hooks/web/usePage';
  import { useUserStore } from '@/store/modules/user';
  import {
    listSimpleUserByNickname,
    entrustCustomerQuerySimpleListByKeyword,
    getPartiesSimpleList,
  } from '@/api/sys/common';

  const go = useGo();
  const records = ref([]);
  const simpleUserList = reactive({
    list: [],
  });

  const count = ref(0);
  const refresh = () => {
    count.value++;
  };
  const userStore = useUserStore();

  const userInfo = computed(() => {
    return userStore.getUserInfo || {};
  });

  const actions = computed(() => (record) => {
    const finallyButton = record.buttonList.filter((item) =>
      userInfo.value?.permissions?.includes(item.permission),
    );
    return finallyButton.map((item) => ({
      label: item.name,
      onClick: () => handleAction(item, record),
    }));
  });

  onMounted(async () => {
    // 调解员，调节主管
    const res = await listSimpleUserByNickname({
      nickname: '',
    });
    simpleUserList.list = res?.map((item) => {
      return {
        label: item.nickname,
        value: item.id,
      };
    });

    // 委案方
    const res2 = await entrustCustomerQuerySimpleListByKeyword({
      keyword: '',
    });
    const { updateSchema } = getForm();
    updateSchema({
      field: `entrustCustomerIdList`,
      componentProps: {
        options: res2?.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        }),
      },
    });

    // 当事人
    const res3 = await getPartiesSimpleList({
      name: '',
    });
    updateSchema({
      field: `partiesList`,
      componentProps: {
        options: res3?.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        }),
      },
    });
    // 标签
    const res4 = await getTagList({ tagName: '' });
    updateSchema({
      field: `tagList`,
      componentProps: {
        options: res4?.map((item) => {
          return {
            label: item,
            value: item,
          };
        }),
      },
    });
  });

  /** 案件确认 */
  const [registerCaseConfirm, { openModal: openCaseConfirm }] = useModal();
  /** 案件指派 */
  const [registerCaseAssign, { openModal: openCaseAssign }] = useModal();
  /** 结案 */
  const [registerCaseClose, { openModal: openCaseClose }] = useModal();
  /** 展期 */
  const [registerApplyExtension, { openModal: openApplyExtension }] = useModal();

  /** 冻结 */
  const [registerFreeze, { openModal: openFreeze }] = useModal();

  /** 打标 */
  const [registerSetTag, { openModal: openSetTag }] = useModal();

  /** 打开案件确认 */
  const handleOpenCaseConfirm = (records) => {
    // 过滤出待确认的数据进行确认
    const finallyRecords = records?.filter((one) => one.status === 'wait_confirm');
    openCaseConfirm(true, finallyRecords);
  };

  /** 打开案件指派 */
  const handleOpenCaseAssign = (records) => {
    const finallyRecords = records?.filter((one) => one.status === 'wait_assign');
    openCaseAssign(true, finallyRecords);
  };

  /** 打开结案 */
  const handleOpenCaseClose = (records) => {
    openCaseClose(true, records);
  };

  /** 打开展期 */
  const handleOpenCaseExtension = (records) => {
    const finallyRecords = records?.filter((one) => one.status === 'mediating');
    openApplyExtension(true, finallyRecords);
  };

  /** 打开冻结 */
  const handleOpenFreeze = () => {
    openFreeze(true, records);
  };

  /** 打开打标 */
  const handleOpenSetTag = (records) => {
    openSetTag(true, records);
  };

  const handleGoDetail = (record) => {
    go(`/case/list/detail/${record.id}`);
  };

  // table 操作按钮
  const handleAction = (action, record) => {
    // 案件确认
    if (action.code === 'lawsuit_confirm') {
      handleOpenCaseConfirm([record]);
    }
    // 案件指派
    if (action.code === 'lawsuit_assign') {
      handleOpenCaseAssign([record]);
    }
    // 申请展期
    if (action.code === 'lawsuit_apply_extend_deadline') {
      handleOpenCaseExtension([record]);
    }

    // 编辑
    if (action.code === 'lawsuit_update') {
      go(`/case/list/add?id=${record.id}`);
    }
  };

  watch(
    () => simpleUserList.list,
    (val) => {
      const { updateSchema } = getForm();
      updateSchema({
        field: `mediatorIdList`,
        componentProps: {
          options: val,
        },
      });
      updateSchema({
        field: `mediatorChargeIdList`,
        componentProps: {
          options: val,
        },
      });
    },
  );

  const rowSelection = {
    type: 'checkbox',
    onChange: (selectedRowKeys, selectedRows) => {
      records.value = selectedRows;
    },
    selectedRowKeys: records.value.map((item) => item.id),
  };

  const [registerTable, { reload, getForm }] = useTable({
    api: async (params) => {
      const { page, ...rest } = params;
      const res = await lawsuitQueryPage({
        ...rest,
        pageNo: page,
      });
      return {
        items: res?.list,
        total: res?.total,
      };
    },
    columns: getColumns({
      handleGoDetail,
      permissions: userInfo?.value?.permissions,
      handleAction,
      handleOpenSetTag,
    }),
    useSearchForm: true,
    formConfig: getFormConfig({ refresh, simpleUserList: simpleUserList.list }),
    showTableSetting: false,
    tableSetting: { fullScreen: true },
    beforeFetch: (params) => {
      delete params.count;
      return params;
    },
    showIndexColumn: false,
    rowKey: 'id',
    rowSelection: rowSelection,
    searchInfo: {
      count: count.value,
    },
    showSelectionBar: false, // 显示多选状态栏
  });

  watch(
    () => count.value,
    () => {
      reload();
      // 重置选中的数据
      records.value = [];
    },
  );

  const handleAdd = () => {
    go(`/case/list/add`);
  };

  const handleImport = () => {
    console.log('handleImport');
  };
</script>

<style lang="less" scoped>
  .search-card {
    margin-bottom: 16px;
    padding: 6px;
    border-radius: 2px;
    background-color: var(--component-background-color);
  }
</style>
