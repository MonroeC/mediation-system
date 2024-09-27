<template>
  <BasicTable @register="registerTable">
    <template #form-custom> custom-slot </template>
    <template #toolbar>
      <Space>
        <Button type="primary" @click="handleOpenAddClient">+ 新增委案方</Button>
        <Button @click="getFormValues">打标</Button>
        <Dropdown>
          <template #overlay>
            <Menu @click="getFormValues">
              <MenuItem key="1" @click="handleOpenFreeze">冻结</MenuItem>
              <MenuItem key="2" @click="handleOpenUnFreeze">解冻</MenuItem>
            </Menu>
          </template>
          <Button>冻结</Button>
        </Dropdown>
      </Space>
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <TableAction
          :actions="[
            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
          ]"
        />
      </template>
    </template>
  </BasicTable>
  <Freeze @register="registerFreeze" />
  <UnFreeze @register="registerUnFreeze" />
  <AddClient @register="registerAddClient" />
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getBasicColumns, getFormConfig } from './tableConfig';
  import { Space, Button, Menu, MenuItem, Dropdown } from 'ant-design-vue';
  import Freeze from './components/Freeze.vue';
  import UnFreeze from './components/UnFreeze.vue';
  import AddClient from './components/AddClient.vue';
  import { useModal } from '@/components/Modal';

  /** 冻结 */
  const [registerFreeze, { openModal: openFreeze }] = useModal();

  /** 解冻 */
  const [registerUnFreeze, { openModal: openUnFreeze }] = useModal();

  /** 添加归属方 */
  const [registerAddClient, { openModal: openAddClient }] = useModal();

  /** 打开冻结 */
  const handleOpenFreeze = () => {
    openFreeze(true, {});
  };
  /** 打开解冻 */
  const handleOpenUnFreeze = () => {
    openUnFreeze(true, {});
  };

  /** 打开添加委案方 */
  const handleOpenAddClient = () => {
    openAddClient(true, {});
  };
  const [registerTable, { getForm }] = useTable({
    api: async () => {
      return {
        items: [{ id: 1 }],
        total: 0,
      };
    },
    columns: getBasicColumns(),
    useSearchForm: true,
    formConfig: getFormConfig(),
    showTableSetting: false,
    tableSetting: { fullScreen: true },
    showIndexColumn: false,
    rowKey: 'id',
    rowSelection: {
      type: 'checkbox',
    },
    showSelectionBar: false, // 显示多选状态栏
  });

  function getFormValues() {
    console.log(getForm().getFieldsValue());
  }

  const handleEdit = (record) => {
    console.log(record);
  };
</script>
