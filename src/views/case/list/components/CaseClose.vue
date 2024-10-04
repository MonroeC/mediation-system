<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="结案"
    destroyOnClose
    width="600px"
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
  import { BasicForm, FormSchema, useForm, ApiSelect } from '@/components/Form';
  import { RESULT } from '/@/views/case/list/constants';
  import { lawsuitApplyClose } from '@/api/biz/case';
  import { message } from 'ant-design-vue';

  const stage = ref('');

  /** 更改分期 */
  const handleChangeStage = (v) => {
    if (stage.value) {
      const deleteFields: any = [];
      Array.from({ length: stage.value }).forEach((one, index) => {
        deleteFields.push(`payDate${index + 1}`, `payAmount${index + 1}`);
      });
      console.log(deleteFields, 999);
      removeSchemaByFieldGroup(deleteFields);
    }

    let fields: any = [];
    Array.from({ length: v }).forEach((one, index) => {
      fields.push(
        {
          field: `payDate${index + 1}`,
          component: 'DatePicker',
          colProps: {
            span: 7,
          },
          label: `${index + 1 === 1 ? '首' : index + 1}期`,
          show: ({ model }) => model.closeType === 'stage',
          required: true,
        },
        {
          field: `payAmount${index + 1}`,
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
          show: ({ model }) => model.closeType === 'stage',
        },
      );
    });
    appendSchemaByFieldGroup(fields, 'stage');
    stage.value = v;
  };

  const schemas: FormSchema[] = [
    {
      field: 'closeType',
      label: '调解结果',
      component: 'RadioGroup',
      colProps: {
        span: 24,
      },
      required: true,
      defaultValue: 'success',
      componentProps: {
        options: RESULT,
        onChange: (v) => {
          if (v.target.value === 'success') {
            updateSchema({
              field: 'payAmount',
              required: true,
            });
            updateSchema({
              field: 'payDate',
              required: true,
            });
            updateSchema({
              field: 'stage',
              required: false,
            });
            updateSchema({
              field: 'attachmentList',
              required: true,
            });
          }
          if (v.target.value === 'stage') {
            updateSchema({
              field: 'payAmount',
              required: false,
            });
            updateSchema({
              field: 'payDate',
              required: false,
            });
            updateSchema({
              field: 'stage',
              required: true,
            });
            updateSchema({
              field: 'attachmentList',
              required: true,
            });
          }
          if (v.target.value === 'fail') {
            updateSchema({
              field: 'payAmount',
              required: false,
            });
            updateSchema({
              field: 'payDate',
              required: false,
            });
            updateSchema({
              field: 'stage',
              required: false,
            });
            updateSchema({
              field: 'attachmentList',
              required: false,
            });
          }
        },
      },
    },
    {
      field: 'payAmount',
      label: '支付金额',
      component: 'InputNumber',
      colProps: {
        span: 24,
      },
      required: true,
      show: ({ model }) => model.closeType === 'success',
    },
    {
      field: 'payDate',
      label: '支付时间',
      component: 'DatePicker',
      colProps: {
        span: 24,
      },
      componentProps: {
        showTime: true,
        format: 'YYYY-MM-DD',
      },
      required: true,
      show: ({ model }) => model.closeType === 'success',
    },
    {
      field: 'stage',
      label: '期数',
      component: 'Select',
      colProps: {
        span: 24,
      },
      required: true,
      componentProps: {
        options: [
          { label: 2, value: 2 },
          { label: 3, value: 3 },
          { label: 4, value: 4 },
          { label: 5, value: 5 },
          { label: 6, value: 6 },
          { label: 7, value: 7 },
          { label: 8, value: 8 },
          { label: 9, value: 9 },
          { label: 10, value: 10 },
          { label: 11, value: 11 },
          { label: 12, value: 12 },
        ],
        onChange: handleChangeStage,
      },
      show: ({ model }) => model.closeType === 'stage',
    },
    {
      field: 'attachmentList',
      label: '上传证据',
      component: 'ImageUpload',
      colProps: {
        span: 24,
      },
      defaultValue: [],
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
      show: ({ model }) => ['success', 'stage']?.includes(model.closeType),
    },

    {
      field: 'remark',
      label: '结案备注',
      component: 'InputTextArea',
      colProps: {
        span: 24,
      },
    },
  ];

  const props = defineProps({
    ok: { type: Function },
  });
  const [
    registerForm,
    {
      validateFields,
      appendSchemaByField: appendSchemaByFieldGroup,
      removeSchemaByField: removeSchemaByFieldGroup,
      setFieldsValue,
      getFieldsValue,
      updateSchema,
      addSchema,
      removeSchema,
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

  const handleOk = async () => {
    const values = await validateFields();
    console.log(values, 'values');

    let params: any = {};

    /** 申请成功结案 */
    if (values.closeType === 'success') {
      params = {
        closeType: values.closeType,
        payAmount: values.payAmount,
        payDate: values.payDate,
        attachmentList: values.attachmentList,
        remark: values.remark,
      };
    }

    if (values.closeType === 'stage') {
      let stageList = [];
      Array.from({ length: values.stage }).forEach((one, index) => {
        stageList.push({
          payDate: values[`payDate${index + 1}`],
          payAmount: values[`payAmount${index + 1}`],
          stageNum: index + 1,
        });
      });
      params = {
        closeType: values.closeType,
        attachmentList: values.attachmentList,
        remark: values.remark,
        stageList,
      };
    }
    if (values.closeType === 'fail') {
      params = {
        closeType: values.closeType,
        remark: values.remark,
      };
    }
    console.log(params, 'params');
    await lawsuitApplyClose(params);
    message.success('申请结案成功');
    props?.ok?.();
  };
</script>
