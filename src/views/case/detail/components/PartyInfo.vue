<template>
  <div ref="scrollableDiv" class="scrollable-div">
    <Description
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
  import { partiesFormSchema } from '@/views/case/add/components/formSchame';
  import { defineProps, ref, onMounted, nextTick } from 'vue';

  const scrollableDiv: any = ref(null);

  onMounted(() => {
    nextTick(() => {
      const divTop = scrollableDiv.value.getBoundingClientRect().top;
      const height = (window.innerHeight - divTop - 80) / 2; // 20px 的间距
      scrollableDiv.value.style.height = `${height}px`;
      scrollableDiv.value.style.overflowY = 'auto';
    });
  });

  defineProps({
    data: { type: Object },
  });
  const schema = partiesFormSchema?.map((item) => ({
    field: item.field,
    label: item.label,
  }));
</script>
