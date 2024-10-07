<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="工单-结案审批"
    destroyOnClose
    @visible-change="handleVisibleChange"
    width="400px"
    @ok="handleOk"
    okText="审核"
    cancelText="取消工单"
  >
    <div class="pt-3px pr-3px">
      <Description
        :labelStyle="{ width: '90px' }"
        :bordered="false"
        :column="1"
        :data="mockData"
        :schema="schema"
        :contentStyle="{ color: '#666' }"
      />
    </div>
    <template #insertFooter>
      <span class="tip">待李四审核</span>
    </template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import Description from '@/components/Description/src/Description.vue';

  const props = defineProps({
    userData: { type: Object },
  });

  console.log(props.userData, 777);

  const [register] = useModalInner((data) => {
    console.log(data, 999);
    data && onDataReceive(data);
  });

  function onDataReceive(data) {
    console.log('Data Received', data);
  }

  const mockData = {
    username: 'test',
    nickName: 'VB',
    age: '123',
    phone: '15695909xxx',
    email: '190848757@qq.com',
    addr: '厦门市思明区',
    sex: '男',
    certy: '3504256199xxxxxxxxx',
    tag: 'orange',
  };
  const schema = [
    {
      field: 'username',
      label: '工单类型',
    },
    {
      field: 'nickName',
      label: '发起人',
      render: (curVal, data) => {
        return `${data.username}-${curVal}`;
      },
    },
    {
      field: 'phone',
      label: '创建时间',
    },
    {
      field: 'email',
      label: '案件',
    },
    {
      field: 'addr',
      label: '委案编号',
    },
    {
      field: 'addr',
      label: '调解结果',
    },
    {
      field: 'addr',
      label: '支付金额',
      show: false,
    },
    {
      field: 'addr',
      label: '期数',
      show: () => false,
    },
    {
      field: 'addr',
      label: '支付金额',
      show: false,
    },
    {
      field: 'addr',
      label: '支付时间',
    },
    {
      field: 'addr',
      label: '相关证据',
    },
    {
      field: 'addr',
      label: '结案备注',
    },
  ];

  const handleOk = () => {};
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
