<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="案件确认"
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
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { listSimpleUserByNickname } from '@/api/sys/common';
  import { lawsuitConfirm } from '@/api/biz/case';
  import { message } from 'ant-design-vue';

  // 弹窗打开时传入的参数
  const records = ref([]);

  // 组件传参
  const props = defineProps({
    ok: { type: Function },
  });

  const schemas: FormSchema[] = [
    {
      field: 'checked',
      component: 'Checkbox',
      label: '',
      colProps: {
        span: 24,
      },
      renderComponentContent:
        '明确案件的风险性、当事人信息、调节目标、调解佣金等重要调解信息是否符合要求',
    },
    {
      field: `mediationCharge`,
      component: 'ApiSelect',
      label: '指派调解负责人',
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
    console.log('Data Received', data);
    records.value = data;
  }

  const handleOk = async () => {
    const values = await validateFields();
    if (!values.checked) {
      return message.error('请勾选确认');
    }
    const res = await lawsuitConfirm({
      mediationCharge: values.mediationCharge,
      lawsuitIdList: records.value.map((item) => item.id),
    });
    if (res) {
      message.success('案件确认成功');
      closeModal?.();
      props?.ok?.();
    }
  };
</script>
