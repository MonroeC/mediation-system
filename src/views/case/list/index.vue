<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <Space>
        <Button type="primary" @click="handleAdd">+ 新建案件</Button>
        <Button type="primary" @click="handleImport">+ 导入案件</Button>
        <Button @click="handleOpenCaseConfirm">案件确认</Button>
        <Button @click="handleOpenCaseAssign">案件指派</Button>
        <Button @click="handleOpenCaseExtension">申请展期</Button>
        <Button @click="handleImport">打标</Button>
        <Button @click="handleOpenFreeze">冻结</Button>
        <Button @click="handleOpenCaseClose">结案</Button>
      </Space>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'action'">
        <TableAction
          :actions="[
            {
              label: '编辑',
              // auth: 'other', // 根据权限控制是否显示: 无权限，不显示
            },
            {
              label: '删除',
              icon: 'ic:outline-delete-outline',
              // auth: 'super', // 根据权限控制是否显示: 有权限，会显示
            },
          ]"
        />
      </template>
    </template>
  </BasicTable>

  <CaseConfirm @register="registerCaseConfirm" />
  <CaseAssign @register="registerCaseAssign" />
  <CaseClose @register="registerCaseClose" />
  <ApplyExtension @register="registerApplyExtension" />
  <Freeze @register="registerFreeze" />
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { Space, Button } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getColumns, getFormConfig } from './constants/table';
  import { useModal } from '@/components/Modal';
  import CaseConfirm from '/@/views/case/list/components/CaseConfirm.vue';
  import CaseAssign from '/@/views/case/list/components/CaseAssign.vue';
  import CaseClose from '/@/views/case/list/components/CaseClose.vue';
  import Freeze from '/@/views/client/list/components/Freeze.vue';
  import ApplyExtension from '/@/views/case/list/components/ApplyExtension.vue';
  import { lawsuitQueryPage } from '@/api/biz/case';
  import { useGo } from '@/hooks/web/usePage';

  const go = useGo();

  const count = ref(0);
  const refresh = () => {
    count.value++;
  };

  const [registerTable, { reload }] = useTable({
    api: async (params) => {
      console.log(params, 'params');
      const { page, ...rest } = params;
      const res = await lawsuitQueryPage({
        ...rest,
        pageNo: page,
      });
      console.log(res, 'res');
      return {
        items: res?.list,
        total: res?.total,
      };
    },
    columns: getColumns(),
    useSearchForm: true,
    formConfig: getFormConfig({ refresh }),
    showTableSetting: false,
    tableSetting: { fullScreen: true },
    beforeFetch: (params) => {
      console.log(params, 'params');
      delete params.count;
      return params;
    },
    showIndexColumn: false,
    rowKey: 'id',
    rowSelection: {
      type: 'checkbox',
    },
    searchInfo: {
      count: count.value,
    },
    showSelectionBar: false, // 显示多选状态栏
  });

  watch(
    () => count.value,
    () => {
      reload();
    },
  );

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

  /** 打开案件确认 */
  const handleOpenCaseConfirm = () => {
    openCaseConfirm(true, {});
  };

  /** 打开案件指派 */
  const handleOpenCaseAssign = () => {
    openCaseAssign(true, {});
  };

  /** 打开结案 */
  const handleOpenCaseClose = () => {
    openCaseClose(true, {});
  };

  /** 打开展期 */
  const handleOpenCaseExtension = () => {
    openApplyExtension(true, {});
  };

  /** 打开冻结 */
  const handleOpenFreeze = () => {
    openFreeze(true, {});
  };

  const handleAdd = () => {
    console.log('handleAdd');
    go(`/case/add`);
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
