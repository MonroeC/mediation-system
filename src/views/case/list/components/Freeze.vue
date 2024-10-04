<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="冻结"
    destroyOnClose
    width="500px"
    @ok="handleOk"
    okText="冻结"
  >
    <div class="pt-3px pr-3px">
      您确定要冻结<a :key="item" v-for="(item, index) in records"
        >{{ item.lawsuitName }}{{ index + 1 !== records?.length ? '、' : '' }}</a
      >案件吗？已冻结的案件将终止调解。
      <BasicForm @register="registerForm" :layout="'vertical'" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { lawsuitFreeze } from '@/api/biz/case';
  import { message } from 'ant-design-vue';

  const records = ref([]);
  const schemas: FormSchema[] = [
    {
      field: 'field2',
      component: 'InputTextArea',
      label: '',
      colProps: {
        span: 24,
      },
      required: true,
      componentProps: {
        placeholder: '请输入冻结原因',
        rows: 4,
      },
    },
  ];

  const props = defineProps({
    ok: { type: Function },
  });
  const [registerForm] = useForm({
    labelWidth: 110,
    schemas,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });

  const [register, { closeModal }] = useModalInner((data) => {
    data && onDataReceive(data);
  });

  function onDataReceive(data) {
    console.log('Data Received', data);
    records.value = data;
  }

  const handleOk = async () => {
    if (!records.value?.length) {
      message.error('请选择案件');
      return;
    }
    await lawsuitFreeze({
      lawsuitIdList: records.value?.map((one) => one.id),
    });
    message.success('冻结成功');
    closeModal?.();
    props?.ok?.();
  };
</script>
