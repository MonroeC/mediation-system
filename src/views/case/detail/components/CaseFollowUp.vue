<template>
  <ScrollContainer>
    <div ref="wrapperRef">
      <Tabs size="small" :tabBarGutter="12" type="card">
        <template v-for="item in baseTabs" :key="item.key">
          <TabPane :tab="item.name">
            <component :is="item.component" />
          </TabPane>
        </template>
      </Tabs>
    </div>
  </ScrollContainer>
</template>
<script lang="ts" setup>
  import { ScrollContainer } from '@/components/Container';
  import { Tabs } from 'ant-design-vue';
  import FollowUp from './FollowUp.vue';
  import MediationRecords from './MediationRecords.vue';
  import Material from './Material.vue';
  import Tickets from './Tickets.vue';

  const TabPane = Tabs.TabPane;

  const baseTabs = [
    {
      key: 'followUp',
      name: '案件跟进',
      component: FollowUp,
    },
    {
      key: 'mediationRecords',
      name: '调解记录',
      component: MediationRecords,
    },
    {
      key: 'material',
      name: '案件材料',
      component: Material,
    },
    {
      key: 'tickets',
      name: '案件工单',
      component: Tickets,
    },
  ];
</script>
