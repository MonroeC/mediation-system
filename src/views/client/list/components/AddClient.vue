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
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { getDictTypeByType } from '@/utils/common';
  import { entrustCustomerCreate } from '@/api/biz/client';
  import { message } from 'ant-design-vue';

  const formData = ref({});
  const schemas: FormSchema[] = [
    {
      field: 'type',
      component: 'Select',
      label: '类型',
      colProps: {
        span: 11,
      },
      required: true,
      componentProps: {
        options: getDictTypeByType('entrust_customer_type'),
      },
    },
    {
      field: 'name',
      component: 'Input',
      label: ' 名称',
      colProps: {
        span: 11,
        offset: 1,
      },
      required: true,
    },
    {
      field: 'orgCode',
      component: 'Input',
      label: '组织机构代码',
      colProps: {
        span: 11,
      },
      required: true,
    },
    {
      field: 'personLegal',
      component: 'Input',
      label: '法定代表人',
      colProps: {
        span: 11,
        offset: 1,
      },
      required: true,
    },
    {
      field: 'orgAddress',
      component: 'Input',
      label: '机构所在地',
      colProps: {
        span: 11,
      },
      required: true,
    },
    {
      field: 'personLegalPhoneNumber',
      component: 'Input',
      label: '法定代表人手机号码',
      colProps: {
        span: 11,
        offset: 1,
      },
      required: true,
      rules: [
        {
          pattern: /^1[3456789]\d{9}$/,
          message: '请输入正确的手机号码',
        },
      ],
    },
    {
      field: 'personContact',
      component: 'Input',
      label: '联系人',
      colProps: {
        span: 11,
      },
    },
    {
      field: 'personContactPhoneNumber',
      component: 'Input',
      label: '联系号码',
      colProps: {
        span: 11,
        offset: 1,
      },
      rules: [
        {
          pattern: /^1[3456789]\d{9}$/,
          message: '请输入正确的手机号码',
        },
      ],
    },
    {
      field: 'repaymentAccount',
      component: 'Input',
      label: '还款账号',
      colProps: {
        span: 11,
      },
    },
    {
      field: 'cooperationPeriod',
      component: 'DatePicker',
      label: '合作期限',
      colProps: {
        span: 11,
        offset: 1,
      },
      required: true,
    },
    {
      field: 'repaymentBank',
      component: 'Input',
      label: '还款银行名称',
      colProps: {
        span: 11,
      },
    },
    {
      field: 'remark',
      component: 'Input',
      label: '备注',
      colProps: {
        span: 11,
        offset: 1,
      },
    },
  ];

  const props = defineProps({
    recordData: { type: Object },
  });

  const [registerForm, { validateFields }] = useForm({
    labelWidth: 150,
    schemas,
    colon: true,
    // labelAlign: 'left',
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
      entrustCustomerCreate(res).then((res) => {
        message.success('新增成功');
      });
    });
    console.log(formData, 'modelRef.value');
  };
</script>
