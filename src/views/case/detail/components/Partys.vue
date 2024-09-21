<template>
  <Card :bodyStyle="{ padding: '0.5rem' }">
    <Tabs size="small" :tabBarGutter="12">
      <template v-for="item in baseTabs" :key="item.key">
        <TabPane :tab="item.name">
          <component :is="item.component" />
        </TabPane>
      </template>
    </Tabs>
  </Card>
</template>
<script lang="ts" setup>
  import { Tabs, Card } from 'ant-design-vue';
  import { ref } from 'vue';
  import PartyInfo from './PartyInfo.vue';

  const TabPane = Tabs.TabPane;

  const baseTabs = ref([
    {
      name: '当事人 1',
      component: PartyInfo,
      key: '1',
    },
    {
      name: '当事人 2',
      component: PartyInfo,
      key: '2',
    },
  ]);
</script>
