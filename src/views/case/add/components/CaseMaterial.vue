<template>
  <div style="padding: 0 36px">
    <BasicForm @register="registerCustom" class="my-5" :layout="'vertical'" />
  </div>
</template>

<script setup lang="ts">
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';
  import { uploadApi } from '@/api/sys/upload';
  import { message } from 'ant-design-vue';

  const { createMessage } = useMessage();
  const schemasCustom: FormSchema[] = [
    {
      field: 'field4',
      component: 'ImageUpload',
      label: '案件相关材料',
      colProps: {
        span: 8,
      },
      componentProps: {
        resultField: 'data4.url',
        api: (file, progress) => {
          return new Promise((resolve, reject) => {
            console.log(file, 'file');
            uploadApi(
              {
                ...file,
                name: 'path',
              },
              progress,
            ).then((uploadApiResponse) => {
              if (uploadApiResponse?.data?.code === 0) {
                resolve({
                  code: 200,
                  data4: {
                    url: uploadApiResponse.data.url,
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
  ];
  const [registerCustom, { getFieldsValue: getFieldsValueCustom }] = useForm({
    labelWidth: 160,
    schemas: schemasCustom,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 18,
    },
    submitFunc: () => {
      return new Promise((resolve) => {
        console.log(getFieldsValueCustom());
        resolve();
        createMessage.success(`请到控制台查看结果`);
      });
    },
  });
</script>
