<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="申请分期结算"
    destroyOnClose
    @visible-change="handleVisibleChange"
    width="600px"
    @ok="handleOk"
  >
    <div class="pt-3px pr-3px">
      <Descriptions>
        <DescriptionsItem label="期数" :contentStyle="{ color: '#666' }">
          {{ mockData.username }} {{ mockData.age }}
        </DescriptionsItem>
        <DescriptionsItem label="x期计划时间" :contentStyle="{ color: '#666' }">
          {{ mockData.username }} {{ mockData.age }}
        </DescriptionsItem>
        <DescriptionsItem label="x期计划时间支付金额" :contentStyle="{ color: '#666' }">
          {{ mockData.username }} {{ mockData.age }}
        </DescriptionsItem>
      </Descriptions>
      <BasicForm @register="registerForm" :layout="'vertical'" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { Descriptions, DescriptionsItem } from 'ant-design-vue';

  const formData = ref({});
  const schemas: FormSchema[] = [
    {
      field: 'field3',
      label: '实际支付时间',
      component: 'DatePicker',
      colProps: {
        span: 24,
      },
      componentProps: {
        showTime: true,
      },
      required: true,
    },
    {
      field: 'field3',
      label: '实际支付金额',
      component: 'InputNumber',
      colProps: {
        span: 24,
      },
      required: true,
    },
    {
      field: 'field4',
      label: '相关证据',
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
      label: '备注',
      component: 'InputTextArea',
      colProps: {
        span: 24,
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

  const mockData = {
    username: 'test',
  };

  const descriptionSchema = [
    {
      field: 'username',
      label: '期数',
    },
    {
      field: 'username',
      label: 'x期计划时间',
    },
    {
      field: 'username',
      label: 'x期计划时间支付金额',
    },
  ];
  const handleOk = () => {
    validateFields().then((res) => {
      console.log(res, 888);
    });
    console.log(formData, 'modelRef.value');
  };
</script>
