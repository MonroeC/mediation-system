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

  const schema = [
    {
      field: 'addr',
      label: '支付金额',
      show: false,
    },
    {
      field: 'addr',
      label: '支付时间',
    },
  ];

  defineProps({
    data: { type: Object },
    otherProps: { type: Object },
  });
</script>
