<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="冻结"
    destroyOnClose
    @visible-change="handleVisibleChange"
    width="500px"
    @ok="handleOk"
    okText="冻结"
  >
    <div class="pt-3px pr-3px">
      您确定要冻结<a>某某银行</a>吗？一旦冻结其所有正在调解中的案件将一同冻结！
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
        placeholder: '请输入冻结原因',
        rows: 4,
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

  /** 获取调解人接口 */
  const optionsListApi = async () => {
    return [
      { label: '张三', value: '1' },
      { label: '李四', value: '2' },
    ];
  };

  const handleSelectChange = (v) => {
    console.log(v, 'handleSelectChange');
    setFieldsValue({ field2: v });
  };

  const handleOk = () => {
    validateFields().then((res) => {
      console.log(res, 888);
    });
    console.log(formData, 'modelRef.value');
  };
</script>
