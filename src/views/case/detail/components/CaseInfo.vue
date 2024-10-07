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
  import { watch, defineProps, ref, nextTick, onMounted } from 'vue';
  import { caseInfoFormSchema } from '@/views/case/add/components/formSchame';

  const data = ref({});

  const props = defineProps({
    detail: { type: Object },
  });

  watch(
    () => props.detail,
    (val) => {
      nextTick(() => {
        let obj = {};
        val?.lawsuitInfo?.list?.forEach((item) => {
          obj[item.label] = item.value;
        });
        data.value = obj;
      });
    },
    {
      deep: true,
      immediate: true,
    },
  );

  const schema = caseInfoFormSchema?.map((item) => ({
    field: item.field,
    label: item.label,
  }));
</script>
