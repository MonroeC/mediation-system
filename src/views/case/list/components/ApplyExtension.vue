<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="申请展期"
    destroyOnClose
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
  import { lawsuitApplyExtensionDeadline } from '@/api/biz/case';
  import { message } from 'ant-design-vue';
  import moment from 'moment';

  const records = ref([]);

  const props = defineProps({
    ok: { type: Function },
  });

  const schemas: FormSchema[] = [
    {
      field: 'entrustDeadline',
      component: 'DatePicker',
      label: '调整委案期限至',
      colProps: {
        span: 22,
      },
      required: true,
      componentProps: {
        format: 'YYYY-MM-DD',
      },
    },
    {
      field: 'reason',
      component: 'InputTextArea',
      label: '调整理由',
      colProps: {
        span: 22,
      },
      required: true,
    },
  ];

  const [registerForm, { validateFields }] = useForm({
    labelWidth: 130,
    schemas,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });

  const [register, { closeModal }] = useModalInner((data) => {
    data && onDataReceive(data);
  });

  function onDataReceive(data) {
    console.log('Data Received', data);
    records.value = data;
  }

  const handleOk = async () => {
    const values = await validateFields();
    const res = await lawsuitApplyExtensionDeadline({
      reason: values.reason,
      lawsuitIdList: records.value.map((item) => item.id),
      entrustDeadline: moment(values.entrustDeadline).format('YYYY-MM-DD'),
    });
    if (res) {
      message.success('案件指派成功');
      closeModal?.();
      props?.ok?.();
    }
  };
</script>
