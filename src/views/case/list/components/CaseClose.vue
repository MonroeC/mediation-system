<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="结案"
    destroyOnClose
    @visible-change="handleVisibleChange"
    width="600px"
    @ok="handleOk"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" :layout="'vertical'" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm, ApiSelect } from '@/components/Form';
  import { RESULT } from '/@/views/case/list/constants';

  const formData = ref({});
  const schemas: FormSchema[] = [
    {
      field: 'field2',
      label: '调节结果',
      component: 'RadioGroup',
      colProps: {
        span: 24,
      },
      required: true,
      defaultValue: '1',
      componentProps: {
        options: RESULT,
      },
    },
  ];

  const props = defineProps({
    userData: { type: Object },
  });
  const [registerForm, { validateFields, setFieldsValue }] = useForm({
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
