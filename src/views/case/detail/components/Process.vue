<template>
  <Steps :current="current" progress-dot size="small" class="steps">
    <Steps.Step v-for="item in steps" :key="item.title" :title="item.title" />
  </Steps>
  <Flex gap="12" class="action" align="center">
    <Button v-show="current === 0" type="primary" @click="handleOpenCaseConfirm">确认</Button>
    <Button v-show="current === 1" type="primary" @click="handleOpenCaseAssign">案件指派</Button>
    <Button v-show="current === 2" type="primary" @click="handleOpenCaseClose">结案</Button>
    <Button v-show="current === 2" type="primary" @click="handleOpenCaseAssign">申请展期</Button>
    <span v-show="current === 4" style="color: #666">xx天xx小时xx分 xx秒（委案期限倒计时）</span>
    <Button v-show="current === 3" type="primary">查看结案工单</Button>
    <Button v-show="current === 4" type="primary">查看结算单</Button>
    <Button v-show="current === 4" type="primary">分期详情</Button>
    <span v-show="current === 4" style="color: #666">距离下一个支付时间xxx天</span>
  </Flex>
  <CaseConfirm @register="registerCaseConfirm" />
  <CaseAssign @register="registerCaseAssign" />
  <CaseClose @register="registerCaseClose" />
</template>
<script lang="ts" setup>
  import { Button, Flex, Steps } from 'ant-design-vue';
  import { ref } from 'vue';
  import { useModal } from '@/components/Modal';
  import CaseConfirm from '/@/views/case/list/components/CaseConfirm.vue';
  import CaseAssign from '/@/views/case/list/components/CaseAssign.vue';
  import CaseClose from '/@/views/case/list/components/CaseClose.vue';

  /** 案件确认 */
  const [registerCaseConfirm, { openModal: openCaseConfirm }] = useModal();
  /** 案件指派 */
  const [registerCaseAssign, { openModal: openCaseAssign }] = useModal();
  /** 结案 */
  const [registerCaseClose, { openModal: openCaseClose }] = useModal();

  /** 打开案件确认 */
  const handleOpenCaseConfirm = () => {
    openCaseConfirm(true, {});
  };

  /** 打开案件指派 */
  const handleOpenCaseAssign = () => {
    openCaseAssign(true, {});
  };

  /** 打开结案 */
  const handleOpenCaseClose = () => {
    openCaseClose(true, {});
  };

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

  const current = ref(2);
</script>
<style lang="scss" scoped>
  .steps {
    margin: 24px 0 0;
  }

  .action {
    padding: 12px 0;
  }
</style>
