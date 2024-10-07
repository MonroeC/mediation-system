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
  import ClientInfo from './ClientInfo.vue';
  import AgentInfo from './AgentInfo.vue';
  import SenderInfo from './SenderInfo.vue';

  const TabPane = Tabs.TabPane;

  const baseTabs = ref([
    {
      name: '委案方信息',
      component: markRaw(ClientInfo),
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
        console.log(val, 33);
        baseTabs.value[0].detail = val?.entrustInfo;
        // 代理人开启
        if (val?.entrustInfo?.entrustAgentEnabled) {
          baseTabs.value.push({
            name: '代理人信息',
            component: markRaw(AgentInfo),
            key: '2',
            detail: val?.entrustInfo,
          });
        }
        if (val?.entrustInfo?.entrustSenderEnabled) {
          baseTabs.value.push({
            name: '被送达人信息',
            component: markRaw(SenderInfo),
            key: '3',
            detail: val?.entrustInfo,
          });
        }
      });
    },
    {
      deep: true,
      immediate: true,
    },
  );

  console.log(baseTabs, 'baseTabs');
</script>
