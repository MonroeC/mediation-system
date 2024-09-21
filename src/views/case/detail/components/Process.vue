<template>
  <Steps :current="current" progress-dot size="small" class="steps">
    <Steps.Step v-for="item in steps" :key="item.title" :title="item.title" />
  </Steps>
  <Flex gap="12" class="action" align="center">
    <Button v-show="current === 0" type="primary">确认</Button>
    <Button v-show="current === 1" type="primary">案件指派</Button>
    <Button v-show="current === 3" type="primary">查看结案工单</Button>
    <Button v-show="current === 4" type="primary">查看结算单</Button>
    <Button v-show="current === 4" type="primary">分期详情</Button>
    <span v-show="current === 4" style="color: #666">距离下一个支付时间xxx天</span>
  </Flex>
</template>
<script lang="ts" setup>
  import { Button, Flex, Steps } from 'ant-design-vue';
  import { ref } from 'vue';

  const steps = [
    {
      title: '新建',
    },
    {
      title: '确认',
    },
    {
      title: '分配/调解中',
    },
    {
      title: '结案中',
    },
    {
      title: '结果',
    },
  ];

  const current = ref(4);
</script>
<style lang="scss" scoped>
  .steps {
    margin: 24px 0 0;
  }

  .action {
    padding: 12px 0;
  }
</style>
