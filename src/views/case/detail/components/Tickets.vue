<template>
  <BasicTable :columns="columns" :dataSource="data" size="small" :scroll="{ x: 900, y: 300 }" />
</template>
<script lang="ts" setup>
  import { BasicTable } from '@/components/Table';

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 80,
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 80,
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
    },
  ];

  const data = [{ id: 1 }];
</script>
<style></style>
