<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="备注"
    destroyOnClose
    width="500px"
    @ok="handleOk"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :layout="'vertical'" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { setMediationRemark } from '@/api/biz/case';
  import { message } from 'ant-design-vue';

  const lawsuitId = ref([]);
  const schemas: FormSchema[] = [
    {
      field: 'mediationRemark',
      component: 'InputTextArea',
      label: '',
      colProps: {
        span: 24,
      },
      required: true,
      componentProps: {
        placeholder: '请输入',
        rows: 6,
      },
    },
  ];

  const props = defineProps({
    ok: { type: Function },
  });
  const [registerForm, { getFieldsValue }] = useForm({
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
    lawsuitId.value = data?.lawsuitId;
  }

  const handleOk = async () => {
    await setMediationRemark({
      lawsuitId: lawsuitId.value,
      mediationRemark: getFieldsValue().mediationRemark,
    });
    message.success('备注成功');
    closeModal?.();
    props?.ok?.();
  };
</script>
