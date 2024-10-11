<template>
  <div ref="scrollableDiv" class="scrollable-div">
    <Description
      :labelStyle="{ width: '90px' }"
      :bordered="false"
      :column="1"
      :data="detail"
      :schema="schema"
      :contentStyle="{ color: '#666' }"
    />
  </div>
</template>

<script lang="ts" setup>
  import Description from '@/components/Description/src/Description.vue';
  import { defineProps, onMounted, nextTick, ref, watch } from 'vue';
  import { clientSchemas } from '@/views/client/list/components/schemas';

  const props = defineProps({
    detail: { type: Object },
  });

  watch(
    () => props.detail,
    (val) => {
      if (val) {
        console.log(val, 'val555');
      }
    },
    { immediate: true },
  );
  console.log(props.detail, 'val555');

  const scrollableDiv: any = ref(null);

  onMounted(() => {
    nextTick(() => {
      const divTop = scrollableDiv.value.getBoundingClientRect().top;
      const height = window.innerHeight - divTop - 20; // 20px 的间距
      scrollableDiv.value.style.height = `${height}px`;
      scrollableDiv.value.style.overflowY = 'auto';
    });
  });

  const schema = clientSchemas?.map((item) => ({
    field: item.field,
    label: item.label,
  }));
</script>
