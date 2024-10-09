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
  import { defineProps, onMounted, nextTick, ref } from 'vue';
  import { clientSchemas } from '@/views/client/list/components/schemas';

  defineProps({
    detail: { type: Object },
  });

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
