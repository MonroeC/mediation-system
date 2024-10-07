<template>
  <Card :bodyStyle="{ padding: '0.5rem' }">
    <Tabs size="small" :tabBarGutter="12">
      <template v-for="item in baseTabs" :key="item.key">
        <TabPane :tab="item.name">
          <component :is="item.component" :data="item.detail" />
        </TabPane>
      </template>
    </Tabs>
  </Card>
</template>
<script lang="ts" setup>
  import { Tabs, Card } from 'ant-design-vue';
  import { watch, defineProps, ref, nextTick, markRaw } from 'vue';
  import PartyInfo from './PartyInfo.vue';

  const TabPane = Tabs.TabPane;

  const baseTabs = ref([
    {
      name: '当事人 1',
      component: markRaw(PartyInfo),
      key: '1',
    },
  ]);

  const props = defineProps({
    detail: { type: Object },
  });

  watch(
    () => props.detail,
    (val) => {
      nextTick(() => {
        baseTabs.value = val?.partiesList?.map((item, index) => ({
          name: `当事人 ${index + 1}`,
          component: markRaw(PartyInfo),
          key: index + 1,
          detail: item,
        }));
      });
    },
    {
      deep: true,
      immediate: true,
    },
  );
</script>
