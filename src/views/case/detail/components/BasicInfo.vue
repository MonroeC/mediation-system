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
  import { watch, defineProps, shallowRef, nextTick, onMounted, ref } from 'vue';
  import { baseInfoFormSchema } from '@/views/case/add/components/formSchame';

  const scrollableDiv: any = ref(null);

  const data = shallowRef({});

  const props = defineProps({
    detail: { type: Object },
  });

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
