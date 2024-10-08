<template>
  <Steps :current="current" progress-dot size="small" class="steps">
    <Steps.Step v-for="item in steps" :key="item.title" :title="item.title" />
  </Steps>
  <Flex gap="12" class="action" align="center">
    <Button
      v-for="item in allButtonLists"
      :type="item.type || 'primary'"
      :key="item.code"
      @click="() => handleClick(item.code)"
    >
      {{ item.name }}
    </Button>
    <!-- <Button v-show="current === 0" type="primary" @click="handleOpenCaseConfirm">确认</Button>
    <Button v-show="current === 1" type="primary" @click="handleOpenCaseAssign">案件指派</Button> -->
    <!-- <Button v-show="current === 2" type="primary" @click="handleOpenCaseClose">结案</Button> -->
    <!-- <Button v-show="current === 2" type="default" @click="handleOpenCaseExtension">申请展期</Button>
    <span v-show="current === 4" style="color: #666">xx天xx小时xx分 xx秒（委案期限倒计时）</span>
    <Button v-show="current === 3" type="primary" @click="handleOpenCloseTicket"
      >查看结案工单</Button
    >
    <Button v-show="[4, 5, 6].includes(current)" type="primary" @click="handleResult"
      >查看结算单</Button
    >
    <Button v-show="current === 6" type="primary" @click="handleByStages">分期详情</Button> -->
    <span v-show="detail?.nextPayDateDesc" style="color: #666">{{ detail?.nextPayDateDesc }}</span>
  </Flex>
  <CaseConfirm @register="registerCaseConfirm" :ok="ok" />
  <CaseAssign @register="registerCaseAssign" :ok="ok" />
  <CaseClose @register="registerCaseClose" :ok="ok" />
  <ApplyExtension @register="registerApplyExtension" :ok="ok" />
  <CloseTicket @register="registerCloseTicket" :ok="ok" />
  <ByStages @register="registerByStages" :ok="ok" />
</template>
<script lang="ts" setup>
  import { Button, Flex, Steps, message } from 'ant-design-vue';
  import { ref, nextTick, defineProps, watch, computed, unref } from 'vue';
  import { useModal } from '@/components/Modal';
  import CaseConfirm from '/@/views/case/list/components/CaseConfirm.vue';
  import CaseAssign from '/@/views/case/list/components/CaseAssign.vue';
  import CaseClose from '/@/views/case/list/components/CaseClose.vue';
  import ApplyExtension from '/@/views/case/list/components/ApplyExtension.vue';
  import CloseTicket from '/@/views/case/list/components/CloseTicket.vue';
  import ByStages from '/@/views/case/list/components/ByStages.vue';
  import { useUserStore } from '@/store/modules/user';
  import { useRouter } from 'vue-router';
  import { getDictTypeByType } from '@/utils/common';

  const { currentRoute } = useRouter();
  const computedParams = computed(() => unref(currentRoute).params);

  const props = defineProps({
    detail: { type: Object },
    ok: { type: Function },
  });

  const otherButton = [
    'lawsuit_update',
    'lawsuit_set_tag',
    'lawsuit_freeze',
    'lawsuit_call',
    'lawsuit_sms',
    'lawsuit_mediation_remark',
    'lawsuit_apply_stage',
    'lawsuit_audit_stage',
    'lawsuit_audit_close',
  ];

  const allButtonLists = ref([]);

  const STATUS = [
    'wait_confirm',
    'wait_assign',
    'mediating',
    'closing',
    'close_success',
    'close_fail',
    'close_stage',
  ];

  const userStore = useUserStore();
  const userInfo = computed(() => {
    return userStore.getUserInfo || {};
  });

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
    openCloseTicket(true, {});
  };

  /** 查看结算单 */
  const handleResult = () => {
    console.log('查看结算单');
    message.info('正在努力开发中～');
    // 跳转到结算页面
  };

  /** 分期详情 */
  const handleByStages = () => {
    openByStages(true, {});
  };

  const clickMap = {
    lawsuit_confirm: handleOpenCaseConfirm,
    lawsuit_assign: handleOpenCaseAssign,
    lawsuit_apply_extend_deadline: handleOpenCaseExtension,
    lawsuit_apply_close: handleOpenCaseClose,
    /** 分期详情 */
    lawsuit_view_close_stage: handleByStages,
    lawsuit_audit_stage: handleOpenCloseTicket,
    lawsuit_view_order: handleOpenCloseTicket,
    lawsuit_view_close_success: handleResult,
  };

  const handleClick = (code) => {
    console.log(code);
    clickMap[code]();
  };

  const steps = ref([
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
  ]);

  const current = ref(0);

  watch(
    () => props.detail,
    (val) => {
      nextTick(() => {
        // 后端返回的可操作的按钮
        allButtonLists.value = val?.buttonList?.filter((item) => !otherButton.includes(item.code));
        // 增加权限过滤可操作的按钮
        allButtonLists.value = allButtonLists?.value?.filter((item) =>
          userInfo.value?.permissions?.includes(item.permission),
        );
        allButtonLists?.value?.forEach((item) => {
          if (item.code === 'lawsuit_apply_extend_deadline') {
            item.type = 'default';
          }
        });
        allButtonLists.value;
        current.value = STATUS.indexOf(val?.status) > 4 ? 4 : STATUS.indexOf(val?.status);
        steps.value[STATUS.indexOf(val?.status)].title = getDictTypeByType('lawsuit_status')?.find(
          (one) => one.value === val?.status,
        )?.label;
        if (['close_stage']?.includes(val?.status)) {
          steps.value[4].title = getDictTypeByType('lawsuit_status')?.find(
            (one) => one.value === val?.status,
          )?.label;
        }
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
