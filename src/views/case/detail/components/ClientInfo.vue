<template>
  <Description
    :labelStyle="{ width: '90px' }"
    :bordered="false"
    :column="1"
    :data="detail"
    :schema="schema"
    :contentStyle="{ color: '#666' }"
  />
</template>

<script lang="ts" setup>
  import Description from '@/components/Description/src/Description.vue';
  import { defineProps } from 'vue';
  import { clientSchemas } from '@/views/client/list/components/schemas';

  defineProps({
    detail: { type: Object },
  });

  const schema = clientSchemas?.map((item) => ({
    field: item.field,
    label: item.label,
  }));
</script>
