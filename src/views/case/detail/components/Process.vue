<template>
  <Steps :current="current" progress-dot size="small" class="steps">
    <Steps.Step v-for="item in steps" :key="item.title" :title="item.title" />
  </Steps>
  <Flex gap="12" class="action" align="center">
    <Button v-show="current === 0" type="primary" @click="handleOpenCaseConfirm">确认</Button>
    <Button v-show="current === 1" type="primary" @click="handleOpenCaseAssign">案件指派</Button>
    <Button v-show="current === 2" type="primary" @click="handleOpenCaseClose">结案</Button>
    <Button v-show="current === 2" type="default" @click="handleOpenCaseExtension">申请展期</Button>
    <span v-show="current === 4" style="color: #666">xx天xx小时xx分 xx秒（委案期限倒计时）</span>
    <Button v-show="current === 3" type="primary" @click="handleOpenCloseTicket"
      >查看结案工单</Button
    >
    <Button v-show="[4, 5, 6].includes(current)" type="primary" @click="handleResult"
      >查看结算单</Button
    >
    <Button v-show="current === 6" type="primary" @click="handleByStages">分期详情</Button>
    <span v-show="current === 6" style="color: #666">距离下一个支付时间xxx天</span>
  </Flex>
  <CaseConfirm @register="registerCaseConfirm" :ok="ok" />
  <CaseAssign @register="registerCaseAssign" :ok="ok" />
  <CaseClose @register="registerCaseClose" />
  <ApplyExtension @register="registerApplyExtension" />
  <CloseTicket @register="registerCloseTicket" :userData="{ a: 1 }" />
  <ByStages @register="registerByStages" />
</template>
<script lang="ts" setup>
  import { Button, Flex, Steps } from 'ant-design-vue';
  import { ref, nextTick, defineProps, watch, computed, unref } from 'vue';
  import { useModal } from '@/components/Modal';
  import CaseConfirm from '/@/views/case/list/components/CaseConfirm.vue';
  import CaseAssign from '/@/views/case/list/components/CaseAssign.vue';
  import CaseClose from '/@/views/case/list/components/CaseClose.vue';
  import ApplyExtension from '/@/views/case/list/components/ApplyExtension.vue';
  import CloseTicket from '/@/views/case/list/components/CloseTicket.vue';
  import ByStages from '/@/views/case/list/components/ByStages.vue';
  import { useRouter } from 'vue-router';

  const { currentRoute } = useRouter();
  const computedParams = computed(() => unref(currentRoute).params);

  const STATUS = [
    'wait_confirm',
    'wait_assign',
    'mediating',
    'close_success',
    'close_fail',
    'close_stage',
  ];

  /** 案件确认 */
  const [registerCaseConfirm, { openModal: openCaseConfirm }] = useModal();
  /** 案件指派 */
  const [registerCaseAssign, { openModal: openCaseAssign }] = useModal();
  /** 结案 */
  const [registerCaseClose, { openModal: openCaseClose }] = useModal();
  /** 展期 */
  const [registerApplyExtension, { openModal: openApplyExtension }] = useModal();
  /** 结算工单 */
  const [registerCloseTicket, { openModal: openCloseTicket }] = useModal();
  /** 分期详情 */
  const [registerByStages, { openModal: openByStages }] = useModal();

  /** 打开案件确认 */
  const handleOpenCaseConfirm = () => {
    openCaseConfirm(true, [
      {
        id: computedParams.value.id,
      },
    ]);
  };

  /** 打开案件指派 */
  const handleOpenCaseAssign = () => {
    openCaseAssign(true, [
      {
        id: computedParams.value.id,
      },
    ]);
  };

  /** 打开结案 */
  const handleOpenCaseClose = () => {
    openCaseClose(true, {
      id: computedParams.value.id,
    });
  };

  /** 打开展期 */
  const handleOpenCaseExtension = () => {
    openApplyExtension(true, [
      {
        id: computedParams.value.id,
      },
    ]);
  };

  /** 打开结算工单 */
  const handleOpenCloseTicket = () => {
    openCloseTicket(true, { b: 2 });
  };

  /** 查看结算单 */
  const handleResult = () => {
    console.log('查看结算单');
    // 跳转到结算页面
  };

  /** 分期详情 */
  const handleByStages = () => {
    openByStages(true, {});
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

  const current = ref(0);

  const props = defineProps({
    detail: { type: Object },
    ok: { type: Function },
  });

  watch(
    () => props.detail,
    (val) => {
      nextTick(() => {
        current.value = STATUS.indexOf(val?.status);
      });
    },
    {
      deep: true,
      immediate: true,
    },
  );
</script>
<style lang="scss" scoped>
  .steps {
    margin: 24px 0 0;
  }

  .action {
    padding: 12px 0;
  }
</style>
