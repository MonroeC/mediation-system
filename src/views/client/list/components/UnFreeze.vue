<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="申请解冻"
    destroyOnClose
    @visible-change="handleVisibleChange"
    width="500px"
    @ok="handleOk"
    okText="申请"
  >
    <div class="pt-3px pr-3px">
      解冻委案方，因其一同冻结的案件将一起解冻！
      <BasicForm @register="registerForm" :layout="'vertical'" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';

  const formData = ref({});
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
        placeholder: '备注',
        rows: 4,
      },
    },
  ];

  const [registerForm, { validateFields }] = useForm({
    labelWidth: 110,
    schemas,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });

  const [register] = useModalInner((data) => {
    data && onDataReceive(data);
  });

  function onDataReceive(data) {
    console.log('Data Received', data);
    // 方式1;
    // setFieldsValue({
    //   field2: data.data,
    //   field1: data.info,
    // });

    // // 方式2
    // modelRef.value = { field2: data.data, field1: data.info };

    // setProps({
    //   model:{ field2: data.data, field1: data.info }
    // })
  }

  function handleVisibleChange(v) {
    console.log(v, 888);
    // v && props.userData && nextTick(() => onDataReceive(props.userData));
  }

  const handleOk = () => {
    validateFields().then((res) => {
      console.log(res, 888);
    });
    console.log(formData, 'modelRef.value');
  };
</script>
