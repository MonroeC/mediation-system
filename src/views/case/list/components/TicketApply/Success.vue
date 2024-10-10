<template>
  <Description
    :labelStyle="{ width: '90px' }"
    :bordered="false"
    :column="1"
    :data="data"
    :schema="otherProps.commonSchema1.concat(schema).concat(otherProps.commonSchema2)"
    :contentStyle="{ color: '#666' }"
  />
</template>
<script lang="ts" setup>
  import Description from '@/components/Description/src/Description.vue';
  import { defineProps } from 'vue';
  import moment from 'moment';

  const schema = [
    {
      field: 'payAmount',
      label: '支付金额',
      show: false,
      render: (cur, val) => `¥${val?.finallyInfo?.payAmount}`,
    },
    {
      field: 'payDate',
      label: '支付时间',
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
