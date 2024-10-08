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
  import { ref, onMounted } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { lawsuitSetTag, getLawsuitTag, getTagList } from '@/api/biz/case';
  import { getDictTypeByType } from '@/utils/common';
  import { uniqBy } from 'lodash';

  import { message } from 'ant-design-vue';
  import { useRequest } from '@vben/hooks';

  const records = ref([]);
  const visible = ref(false);

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
        options: [],
      },
    },
  ];
  useRequest(getTagList, {
    ready: visible.value && records.value?.length === 1,
    refreshDeps: [visible.value, records.value],
    onSuccess: (res) => {
      console.log(res, 'res');
    },
  });

  const props = defineProps({
    ok: { type: Function },
  });
  const [registerForm, { getFieldsValue, updateSchema }] = useForm({
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
    visible.value = true;
    const preTags = getDictTypeByType('lawsuit_system_tag');
    const tagOptions = (data?.length === 1 ? data?.[0].tagList : [])
      ?.map((one) => ({
        value: one,
        label: one,
      }))
      .concat(preTags);
    const defaultValueObj =
      data?.length === 1
        ? {
            defaultValue: (data?.[0].tagList || []).map((one) => one),
          }
        : {};
    updateSchema({
      field: 'tagList',
      ...defaultValueObj,
      componentProps: {
        options: uniqBy(tagOptions, 'value'),
      },
    });
  }

  const handleOk = async () => {
    if (!records.value?.length) {
      message.error('请选择案件');
      return;
    }
    await lawsuitSetTag({
      lawsuitIdList: records.value?.map((one) => one.id),
      tagList: getFieldsValue().tagList,
    });
    message.success('打标成功');
    closeModal?.();
    props?.ok?.();
  };
</script>
