<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="申请展期"
    destroyOnClose
    @visible-change="handleVisibleChange"
    width="600px"
    @ok="handleOk"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" />
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
      field: 'field1',
      component: 'DatePicker',
      label: '调整委案期限至',
      colProps: {
        span: 22,
      },
      required: true,
    },
    {
      field: 'field2',
      component: 'InputTextArea',
      label: '调整理由',
      colProps: {
        span: 22,
      },
      required: true,
      defaultValue: '',
    },
  ];

  const props = defineProps({
    userData: { type: Object },
  });
  const [registerForm, { validateFields }] = useForm({
    labelWidth: 130,
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
