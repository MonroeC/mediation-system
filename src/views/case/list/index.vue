<template>
  <Card class="search-card">
    <Space>
      <InputSearch :placeholder="searchConfig.searchInput.placeholder" />
      <Select :options="searchConfig.options" defaultValue="myCase" />
      <RadioGroup
        v-model:value="buttonsValue"
        @change="
          (e) => {
            reloadTable({ type: e.target.value });
          }
        "
      >
        <RadioButton v-for="item in searchConfig.buttons" :value="item.value" :key="item.value">{{
          item.label
        }}</RadioButton>
      </RadioGroup>
    </Space>
  </Card>
  <BasicTable @register="registerTable">
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
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { Card, Space, InputSearch, Select, RadioGroup, RadioButton } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { getSearch, getColumns } from './constants/table';

  const buttonsValue = ref('all');

  const [registerTable, { reload }] = useTable({
    // HACK: 发起请求
    api: (params) => {
      console.log(params);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            items: Array.from({ length: 200 }).map((_, index) => ({
              id: index,
              name: `name-${index}`,
            })),
            total: 200,
          });
        }, 1000);
      });
    },
    columns: getColumns(),
    bordered: true,
    rowKey: 'id',
    rowSelection: {
      type: 'checkbox',
    },
    showSelectionBar: true, // 显示多选状态栏
    showIndexColumn: false, // 显示序号列
  });

  const searchConfig = getSearch();

  const reloadTable = (params) => {
    console.log('reloadTable', params);
    reload(params);
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
