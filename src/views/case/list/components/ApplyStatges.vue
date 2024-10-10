<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="申请分期结算"
    destroyOnClose
    width="600px"
    @ok="handleOk"
  >
    <div class="pt-3px pr-3px">
      <Descriptions :column="1">
        <DescriptionsItem label="期数" :contentStyle="{ color: '#666' }">
          {{ itemData?.stageNum }} 共{{ data?.closeStageOrder?.stageCount }}期
        </DescriptionsItem>
        <DescriptionsItem
          :label="itemData.stageNum + '期计划时间'"
          :contentStyle="{ color: '#666' }"
        >
          {{ itemData?.payDate ? moment(itemData?.payDate).format('YYYY-MM-DD HH:mm:ss') : '' }}
        </DescriptionsItem>
        <DescriptionsItem
          :label="itemData?.stageNum + '期计划时间支付金额'"
          :contentStyle="{ color: '#666' }"
        >
          ¥{{ itemData.payAmount }}
        </DescriptionsItem>
      </Descriptions>
      <BasicForm @register="registerForm" :layout="'vertical'" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, computed } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { Descriptions, DescriptionsItem } from 'ant-design-vue';
  import { lawsuitApplyStage } from '@/api/biz/case';
  import { useRequest } from '@vben/hooks';
  import { useRouter } from 'vue-router';

  import moment from 'moment';
  import { uploadApi } from '@/api/sys/upload';
  import { message } from 'ant-design-vue/lib';

  const itemData = ref({});
  const data = ref({});
  const { currentRoute } = useRouter();
  const computedParams = computed(() => unref(currentRoute).params);
  const schemas: FormSchema[] = [
    {
      field: 'realPayDate',
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
      field: 'realPayAmount',
      label: '实际支付金额',
      component: 'InputNumber',
      colProps: {
        span: 24,
      },
      required: true,
    },
    {
      field: 'attachmentList',
      label: '相关证据',
      component: 'ImageUpload',
      colProps: {
        span: 24,
      },
      componentProps: {
        resultField: 'data.url',
        maxSize: 20,
        maxNumber: 9,
        multiple: true,
        accept: ['png', 'jpg', 'jpeg', 'pdf', 'doc', 'docx'],
        api: (file, progress) => {
          return new Promise((resolve, reject) => {
            uploadApi(
              {
                ...file,
                name: 'file',
              },
              progress,
            ).then((uploadApiResponse) => {
              if (uploadApiResponse?.data?.code === 0) {
                resolve({
                  code: 200,
                  data: {
                    url: uploadApiResponse.data?.data?.id,
                  },
                });
              } else {
                message.error('上传失败');
                reject();
              }
            });
          });
        },
      },
    },

    {
      field: 'remark',
      label: '备注',
      component: 'InputTextArea',
      colProps: {
        span: 24,
      },
    },
  ];

  const [register, { closeModal }] = useModalInner((data) => {
    data && onDataReceive(data);
  });

  const props = defineProps({
    ok: { type: Function },
    lawsuitId: { type: Number },
  });

  const { run } = useRequest(lawsuitApplyStage, {
    manual: true,
    onSuccess: () => {
      console.log('success');
      props?.ok();
      closeModal();
    },
  });

  const [registerForm, { validateFields }] = useForm({
    labelWidth: 110,
    schemas,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });

  function onDataReceive(data) {
    console.log('Data Received111', data);
    itemData.value = unref(data).itemData;
    data.value = unref(data).data;
    console.log(data.value?.closeStageOrder?.stageCount, 999);
  }

  const handleOk = () => {
    validateFields().then((values) => {
      run({
        lawsuitId: computedParams.value.id,
        stageNum: itemData.value.stageNum,
        ...values,
        realPayDate: moment(values.realPayDate).format('YYYY-MM-DD'),
      });
    });
  };
</script>
