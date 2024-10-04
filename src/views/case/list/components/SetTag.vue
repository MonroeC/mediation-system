<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="打标"
    destroyOnClose
    width="500px"
    @ok="handleOk"
  >
    <div class="pt-3px pr-3px">
      选择或输入标签
      <BasicForm @register="registerForm" :layout="'vertical'" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { lawsuitSetTag } from '@/api/biz/case';
  import { message } from 'ant-design-vue';

  const records = ref([]);
  const schemas: FormSchema[] = [
    {
      field: 'tagList',
      component: 'Select',
      label: '',
      colProps: {
        span: 24,
      },
      required: true,
      componentProps: {
        placeholder: '请输入标签',
        mode: 'tags',
        options: [
          { value: '1', label: '标签1' },
          { value: '2', label: '标签2' },
          { value: '3', label: '标签3' },
        ],
      },
    },
  ];

  const props = defineProps({
    ok: { type: Function },
  });
  const [registerForm, { getFieldsValue }] = useForm({
    labelWidth: 110,
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
    if (!records.value?.length) {
      message.error('请选择案件');
      return;
    }
    await lawsuitSetTag({
      lawsuitId: records.value?.map((one) => one.id),
      tagList: getFieldsValue().tagList,
    });
    message.success('打标成功');
    closeModal?.();
    props?.ok?.();
  };
</script>
