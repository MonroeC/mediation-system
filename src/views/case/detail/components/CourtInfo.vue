<template>
  <div ref="scrollableDiv" class="scrollable-div">
    <Description
      v-bind="$attrs"
      :labelStyle="{ width: '90px' }"
      :bordered="false"
      :column="1"
      :data="data"
      :schema="schema"
      :contentStyle="{ color: '#666' }"
    />
  </div>
</template>

<script lang="ts" setup>
  import Description from '@/components/Description/src/Description.vue';
  import { watch, defineProps, ref, nextTick, onMounted } from 'vue';
  import { courtInfoFormSchema } from '@/views/case/add/components/formSchame';

  const data = ref({});

  const props = defineProps({
    detail: { type: Object },
  });

  const scrollableDiv: any = ref(null);
  onMounted(() => {
    nextTick(() => {
      const divTop = scrollableDiv.value.getBoundingClientRect().top;
      const height = window.innerHeight - divTop - 46; // 20px 的间距
      scrollableDiv.value.style.height = `${height}px`;
      scrollableDiv.value.style.overflowY = 'auto';
    });
  });

  watch(
    () => props.detail,
    (val) => {
      nextTick(() => {
        let obj = {};
        val?.courtInfo?.list?.forEach((item) => {
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

  const schema = courtInfoFormSchema?.map((item) => ({
    field: item.field,
    label: item.label,
  }));
</script>
