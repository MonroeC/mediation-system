<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="案件指派"
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
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { listSimpleUserByNickname } from '@/api/sys/common';
  import { message } from 'ant-design-vue';
  import { lawsuitAssign } from '@/api/biz/case';

  const records = ref([]);

  const props = defineProps({
    ok: { type: Function },
  });

  const schemas: FormSchema[] = [
    {
      field: `mediators`,
      component: 'ApiSelect',
      label: '指派调解员',
      colProps: {
        span: 24,
      },
      required: true,
      /** 远程加载数据 */
      componentProps: {
        placeholder: '请选择',
        api: listSimpleUserByNickname,
        showSearch: true,
        apiSearch: {
          show: true,
          searchName: 'name',
        },
        params: {
          nickname: '',
        },
        afterFetch: (list) => {
          console.log(list, 'list');
        },
        resultField: 'list',
        labelField: 'nickname',
        valueField: 'id',
        immediate: true,
        onChange: () => {},
        optionLabelRender: ({ nickname }) => {
          return `<div>
                <span>${nickname}</span>
                <span> - 自定义内容</span>
              </div>`;
        },
      },
    },
  ];

  const [registerForm, { validateFields }] = useForm({
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
    records.value = data;
  }

  const handleOk = async () => {
    const values = await validateFields();
    const res = await lawsuitAssign({
      mediators: values.mediators ? [values.mediators] : [],
      lawsuitIdList: records.value.map((item) => item.id),
    });
    if (res) {
      message.success('案件指派成功');
      closeModal?.();
      props?.ok?.();
    }
  };
</script>
