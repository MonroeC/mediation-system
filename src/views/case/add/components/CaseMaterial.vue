<template>
  <div style="padding: 0 36px">
    <BasicForm @register="registerCustom" class="my-5" :layout="'vertical'" />
  </div>
</template>

<script setup lang="ts">
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { uploadApi } from '@/api/sys/upload';
  import { message } from 'ant-design-vue';

  const schemasCustom: FormSchema[] = [
    {
      field: 'field4',
      component: 'Upload',
      label: '案件相关材料',
      colProps: {
        span: 8,
      },
      componentProps: {
        resultField: 'data.url',
        maxSize: 20,
        maxNumber: 9,
        multiple: true,
        accept: ['image/*', 'doc', 'docx', 'pdf'],
        api: (file, progress) => {
          return new Promise((resolve, reject) => {
            console.log(file, 'file');
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
  ];

  const [registerCustom, { validateFields }] = useForm({
    labelWidth: 160,
    schemas: schemasCustom,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 18,
    },
  });

  const getFormData = async () => {
    const materialInfo = await validateFields();
    return Promise.resolve(materialInfo?.field4);
  };
  defineExpose({ getFormData });
</script>
