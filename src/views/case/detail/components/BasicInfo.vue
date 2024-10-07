<template>
  <Description
    v-bind="$attrs"
    :labelStyle="{ width: '90px' }"
    :bordered="false"
    :column="1"
    :data="data"
    :schema="schema"
    :contentStyle="{ color: '#666' }"
  />
</template>

<script lang="ts" setup>
  import Description from '@/components/Description/src/Description.vue';
  import { watch, defineProps, shallowRef, nextTick } from 'vue';
  import { baseInfoFormSchema } from '@/views/case/add/components/formSchame';

  const data = shallowRef({});

  const props = defineProps({
    detail: { type: Object },
  });

  watch(
    () => props.detail,
    (val) => {
      nextTick(() => {
        data.value = val?.baseInfo;
      });
    },
    {
      deep: true,
      immediate: true,
    },
  );

  const schema = baseInfoFormSchema?.map((item) => ({
    field: item.field,
    label: item.label,
  }));
</script>
