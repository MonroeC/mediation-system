<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="新增委案方"
    destroyOnClose
    @visible-change="handleVisibleChange"
    width="1000px"
    @ok="handleOk"
  >
    <div class="pt-3px pr-3px">
      <BasicForm @register="registerForm" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { entrustCustomerCreate } from '@/api/biz/client';
  import { message } from 'ant-design-vue';
  import { clientSchemas } from '@/views/client/list/components/schemas';

  const formData = ref({});

  const props = defineProps({
    recordData: { type: Object },
    cancel: { type: Function },
  });

  watch(
    () => props.recordData,
    (val) => {
      console.log(val, 'recordData');
      setFieldsValue(val);
    },
  );

  const [registerForm, { validateFields, resetFields, setFieldsValue }] = useForm({
    labelWidth: 150,
    schemas: clientSchemas,
    colon: true,
    // labelAlign: 'left',
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });

  const [register, { closeModal }] = useModalInner((data) => {
    console.log(data, 'data');
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

  console.log(props, 'props');
  const handleOk = () => {
    validateFields().then((res) => {
      entrustCustomerCreate(res).then(() => {
        message.success('新增成功');
        resetFields();
        closeModal?.();
      });
    });
    console.log(formData, 'modelRef.value');
  };
</script>
