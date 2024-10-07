<template>
  <Description
    v-bind="$attrs"
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
  import { entrustAgentFormSchema } from '@/views/case/add/components/formSchame';

  defineProps({
    detail: { type: Object },
  });

  const schema = entrustAgentFormSchema?.map((item) => ({
    field: item.field,
    label: item.label,
  }));
</script>
