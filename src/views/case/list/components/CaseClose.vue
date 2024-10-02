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
  const fenQi = ref('');

  /** 更改分期 */
  const handleChangeField6 = (v) => {
    if (fenQi.value) {
      const deleteFields: any = [];
      Array.from({ length: fenQi.value }).forEach((one, index) => {
        deleteFields.push(`fenQiTime${index + 1}`, `fenQiMoney${index + 1}`);
      });
      console.log(deleteFields, 999);
      removeSchemaByFieldGroup(deleteFields);
    }

    let fields: any = [];
    Array.from({ length: v }).forEach((one, index) => {
      fields.push(
        {
          field: `fenQiTime${index + 1}`,
          component: 'DatePicker',
          colProps: {
            span: 7,
          },
          label: `${index + 1 === 1 ? '首' : index + 1}期`,
          show: ({ model }) => model.field1 === '3',
          required: true,
        },
        {
          field: `fenQiMoney${index + 1}`,
          component: 'InputNumber',
          colProps: {
            span: 12,
          },
          label: '1',
          labelWidth: 0,
          componentProps: {
            placeholder: '请输入支付金额',
          },
          required: true,
          show: ({ model }) => model.field1 === '3',
        },
      );
    });
    appendSchemaByFieldGroup(fields, 'field6');
    fenQi.value = v;
  };

  const schemas: FormSchema[] = [
    {
      field: 'field1',
      label: '调解结果',
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
    {
      field: 'field2',
      label: '支付金额',
      component: 'InputNumber',
      colProps: {
        span: 24,
      },
      required: true,
      show: ({ model }) => model.field1 === '1',
    },
    {
      field: 'field3',
      label: '支付时间',
      component: 'DatePicker',
      colProps: {
        span: 24,
      },
      componentProps: {
        showTime: true,
      },
      required: true,
      show: ({ model }) => model.field1 === '1',
    },
    {
      field: 'field6',
      label: '期数',
      component: 'Select',
      colProps: {
        span: 24,
      },
      required: true,
      componentProps: {
        options: [
          { label: 2, value: 2 },
          { label: 4, value: 4 },
          { label: 8, value: 8 },
        ],
        onChange: handleChangeField6,
      },
      show: ({ model }) => model.field1 === '3',
    },
    {
      field: 'field4',
      label: '上传证据',
      component: 'ImageUpload',
      colProps: {
        span: 24,
      },
      componentProps: {
        accept: ['png', 'jpeg', 'jpg', 'pdf'],
        maxSize: 5,
        maxNumber: 6,
        api: () => {
          return Promise.resolve([
            {
              name: '图片1',
              url: 'https://img.yzcdn.cn/vant/leaf.jpg',
            },
            {
              name: '图片2',
              url: 'https://img.yzcdn.cn/vant/tree.jpg',
            },
          ]);
        },
      },
      required: true,
      show: ({ model }) => ['1', '3']?.includes(model.field1),
    },

    {
      field: 'field5',
      label: '结案备注',
      component: 'InputTextArea',
      colProps: {
        span: 24,
      },
    },
  ];

  const props = defineProps({
    userData: { type: Object },
  });
  const [
    registerForm,
    {
      validateFields,
      appendSchemaByField: appendSchemaByFieldGroup,
      removeSchemaByField: removeSchemaByFieldGroup,
      setFieldsValue,
      getFieldsValue,
    },
  ] = useForm({
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
