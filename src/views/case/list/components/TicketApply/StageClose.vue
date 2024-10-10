<template>
  <Description
    :labelStyle="{ width: '90px' }"
    :bordered="false"
    :column="1"
    :data="data"
    :schema="otherProps.commonSchema1"
    :contentStyle="{ color: '#666' }"
  />
  <DescriptionsVue :column="1">
    <DescriptionsVue.Item
      label="支付金额"
      :contentStyle="{
        display: 'flex',
        flexDirection: 'column',
        color: 'rgb(102, 102, 102)',
      }"
      :labelStyle="{ width: '90px' }"
    >
      <div direction="vertical" v-for="item in data.finallyInfo?.stageList" :key="item.stageNum">
        <Space>
          <span>
            {{ item.payDate ? moment(item.payDate).format('YYYY-MM-DD HH:mm:ss') : '' }}
          </span>
          <span>¥{{ item.payAmount }}</span>
          <span>TODO: 状态</span>
        </Space>
      </div>
    </DescriptionsVue.Item>
  </DescriptionsVue>
  <Description
    :labelStyle="{ width: '90px' }"
    :bordered="false"
    :column="1"
    :data="data"
    :schema="otherProps.commonSchema2"
    :contentStyle="{ color: '#666' }"
  />
</template>
<script lang="ts" setup>
  import Description from '@/components/Description/src/Description.vue';
  import { Descriptions as DescriptionsVue, Space } from 'ant-design-vue';

  import { defineProps } from 'vue';
  import moment from 'moment';

  const schema = [
    {
      field: 'stageCount',
      label: '期数',
      show: false,
      render: (cur, val) => val?.finallyInfo?.stageCount,
    },
    {
      field: 'payDate',
      label: '支付金额',
      render: (cur, val) =>
        val?.finallyInfo?.payDate
          ? moment(val?.finallyInfo?.payDate).format('YYYY-MM-DD HH:mm:ss')
          : '',
    },
  ];

  defineProps({
    data: { type: Object },
    otherProps: { type: Object },
  });
</script>
