<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="title"
    destroyOnClose
    @visible-change="handleVisibleChange"
    width="400px"
    @ok="handleOk"
    okText="审核"
    cancelText="取消工单"
  >
    <div class="pt-3px pr-3px">
      <!-- <Description
        :labelStyle="{ width: '90px' }"
        :bordered="false"
        :column="1"
        :data="data"
        :schema="schema"
        :contentStyle="{ color: '#666' }"
      /> -->
      <component
        :is="lists[data.auditStatus].cusComponent"
        :data="data"
        :otherProps="lists[data.auditStatus].otherProps"
      />
    </div>
    <template #insertFooter>
      <span class="tip">待{{ data.auditUserName }}审核</span>
    </template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { lawsuitWorkOrderbyLawsuitId, lawsuitCloseAgree } from '@/api/biz/case';
  import { useRequest } from '@vben/hooks';
  import { useRouter } from 'vue-router';
  import { computed, unref, ref } from 'vue';
  import { getDictTypeByType } from '@/utils/common';
  import Success from './TicketApply/Success.vue';
  import { message } from 'ant-design-vue';

  const title = ref('工单');

  const { currentRoute } = useRouter();
  const computedParams = computed(() => unref(currentRoute).params);
  const visible = ref(false);

  const { loading, data } = useRequest(
    () =>
      lawsuitWorkOrderbyLawsuitId({
        lawsuitId: computedParams.value.id,
      }),
    {
      ready: !!computedParams.value.id && visible.value,
      refreshDeps: [computedParams.value.id, visible.value],
      onSuccess: (res) => {
        console.log(res, 999);
        title.value =
          getDictTypeByType('order_type')?.find((one) => one.value === res.orderType)?.label +
          '审批';
      },
    },
  );

  const props = defineProps({
    userData: { type: Object },
  });

  // useModalInner 如何修改弹窗标题

  const [register, { setTitle }] = useModalInner((data) => {
    console.log(data, 999);
    visible.value = true;
    data && onDataReceive(data);
  });

  function onDataReceive(data) {
    console.log('Data Received', data);
  }

  const commonSchema1 = [
    {
      field: 'username',
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
    {
      field: 'addr',
      label: '调解结果',
      render: (curVal, record) => {
        return getDictTypeByType('apply_status')?.find((one) => one.value === record.auditStatus)
          ?.label;
      },
    },
  ];
  const commonSchema2 = [
    {
      field: 'addr',
      label: '相关证据',
    },
    {
      field: 'addr',
      label: '结案备注',
    },
  ];

  const lists = {
    apply_success: {
      cusComponent: Success,
      otherProps: {
        commonSchema1: commonSchema1,
        commonSchema2: commonSchema2,
      },
    },
  };

  const { run: lawsuitCloseAgreeRequest } = useRequest(lawsuitCloseAgree, {
    manual: true,
    onSuccess: () => {
      message.success('结案成功');
    },
  });

  const handleOk = () => {
    lawsuitCloseAgreeRequest({
      lawsuitId: computedParams.value.id,
      agree: true,
    });
  };
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
