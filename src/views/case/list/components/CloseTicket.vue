<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="title"
    destroyOnClose
    @visible-change="handleVisibleChange"
    width="500px"
    okText="审核"
    :ok-button-props="{ disabled: !isAudit }"
    cancelText="取消工单"
  >
    <template #footer>
      <Flex justify="space-between">
        <span v-show="isAudit">待 {{ data?.auditUserName }} 审核</span>
        <Space>
          <Button @click="handleCancel" key="cancel" :disabled="!isAudit" :loading="actionLoading"
            >取消工单</Button
          >
          <Button
            @click="handleOk"
            key="ok"
            :disabled="!isAudit"
            type="primary"
            :loading="actionLoading"
            >审核</Button
          >
        </Space>
      </Flex>
    </template>
    <div class="pt-3px pr-3px">
      <component
        :is="lists[data?.orderType]?.cusComponent"
        :data="detail"
        :otherProps="lists[data?.orderType]?.otherProps"
      />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { lawsuitWorkOrderbyLawsuitId, lawsuitCloseAgree } from '@/api/biz/case';
  import { useRequest } from '@vben/hooks';
  import { useRouter } from 'vue-router';
  import { computed, unref, ref, defineProps } from 'vue';
  import { getDictTypeByType } from '@/utils/common';
  import Success from './TicketApply/Success.vue';
  import StageClose from './TicketApply/StageClose.vue';
  import { message, Button, Flex, Space } from 'ant-design-vue';
  import { useUserStore } from '@/store/modules/user';

  const title = ref('工单');

  const { currentRoute } = useRouter();
  const computedParams = computed(() => unref(currentRoute).params);

  const userStore = useUserStore();
  const userInfo = computed(() => {
    return userStore.getUserInfo || {};
  });
  const permission = computed(() => {
    return userInfo.value?.permissions || [];
  });

  const isAudit = computed(() => {
    return permission.value.includes('biz:lawsuit:audit-close');
  });

  const detail = ref({});

  const props = defineProps<{
    ok: { type: Function };
  }>();

  const { data, run } = useRequest(
    () =>
      lawsuitWorkOrderbyLawsuitId({
        lawsuitId: computedParams.value.id,
      }),
    {
      manual: true,
      ready: !!computedParams.value.id,
      refreshDeps: [computedParams.value.id],
      onSuccess: (res) => {
        console.log(res, 999);
        detail.value = {
          ...res,
          finallyInfo: res.closeSuccessOrder || res.closeStageOrder || res.closeFailOrder,
        };
        title.value =
          getDictTypeByType('order_type')?.find((one) => one.value === res.orderType)?.label +
          '审批';
      },
    },
  );

  const [register, { closeModal }] = useModalInner((data) => {
    run();
    data && onDataReceive(data);
  });

  function onDataReceive(data) {
    console.log('Data Received', data);
  }

  const commonSchema1 = [
    {
      field: 'orderType',
      label: '工单类型',
      render: (curVal, record) => {
        return getDictTypeByType('order_type')?.find((one) => one.value === record.orderType)
          ?.label;
      },
    },
    {
      field: 'createUserName',
      label: '发起人',
    },
    {
      field: 'createTime',
      label: '创建时间',
    },
    {
      field: 'lawsuitName',
      label: '案件',
    },
    {
      field: 'entrustCode',
      label: '委案编号',
    },
    // {
    //   field: 'addr',
    //   label: '调解结果',
    //   render: (curVal, record) => {
    //     return getDictTypeByType('apply_status')?.find((one) => one.value === record.auditStatus)
    //       ?.label;
    //   },
    // },
  ];
  const commonSchema2 = [
    {
      field: 'attachmentList',
      label: '相关证据',
      // render: (cur, val) => ${val?.closeSuccessOrder?.attachmentList},
    },
    {
      field: 'remark',
      label: '结案备注',
      render: (cur, val) => `${val?.finallyInfo?.remark}`,
    },
  ];

  const lists = {
    close_success: {
      cusComponent: Success,
      otherProps: {
        commonSchema1: commonSchema1,
        commonSchema2: commonSchema2,
      },
    },
    close_stage: {
      cusComponent: StageClose,
      otherProps: {
        commonSchema1: commonSchema1,
        commonSchema2: commonSchema2,
      },
    },
  };

  const { run: lawsuitCloseAgreeRequest, loading: actionLoading } = useRequest(lawsuitCloseAgree, {
    manual: true,
    onSuccess: () => {
      message.success('操作成功');
      closeModal();
      props?.ok();
    },
  });

  const handleOk = () => {
    lawsuitCloseAgreeRequest({
      lawsuitId: computedParams.value.id,
      agree: true,
    });
  };

  function handleCancel() {
    lawsuitCloseAgreeRequest({
      lawsuitId: computedParams.value.id,
      agree: false,
    });
  }
  function handleVisibleChange(v) {
    console.log(v, 888);
    // v && props.userData && nextTick(() => onDataReceive(props.userData));
  }
</script>
<style lang="scss" scoped>
  .tip {
    position: absolute;
    left: 20px;
    line-height: 32px;
  }
</style>
