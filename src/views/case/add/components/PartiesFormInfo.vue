<template>
  <CollapseContainer>
    <template #title>
      <Flex gap="10" align="center">
        <span>当事人{{ index + 1 }}信息</span>
        <Button size="small" type="primary" @click="handleAdd">添加当事人</Button>
        <Button size="small" type="primary" v-show="len > 1" @click="() => handleDelete(data)"
          >删除当事人</Button
        >
      </Flex>
    </template>
    <BasicForm v-model="partiesForms[index]" @register="registerPartiesForm" />
  </CollapseContainer>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { CollapseContainer } from '@/components/Container';
  import { partiesFormSchema } from './formSchame';
  import { Flex, Button } from 'ant-design-vue';
  import moment from 'moment';

  import { ref, watch, defineProps, nextTick } from 'vue';

  const partiesForms = ref([{}]); // 初始化表单数据数组

  const props = defineProps({
    data: { type: Object },
    editMode: { type: String },
    handleAdd: { type: Function },
    handleDelete: { type: Function },
    index: { type: Number },
    len: { type: Number },
  });

  const [
    registerPartiesForm,
    { validateFields: partiesValidateFields, setFieldsValue: partiesSetFieldsValue, updateSchema },
  ] = useForm({
    labelWidth: 130,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
    schemas: partiesFormSchema,
  });

  watch(
    () => props.data,
    (val) => {
      if (val) {
        nextTick(() => {
          partiesSetFieldsValue({
            ...val,
            birthDate: val['birthDate'] ? moment(val['birthDate']) : null,
            identityNoPeriod: val['identityNoPeriod'] ? moment(val['identityNoPeriod']) : null,
          });
        });
      }
    },
    { immediate: true },
  );

  watch(
    () => props.editMode,
    (val) => {
      nextTick(() => {
        if (val === 'scope1') {
          const arr = [
            'partiesType',
            'name',
            'gender',
            'nation',
            'registrationAddress',
            'identityNo',
            'birthDate',
          ];
          arr.forEach((item) => {
            updateSchema({
              field: item,
              componentProps: {
                disabled: true,
              },
            });
          });
        }
      });
    },
    { immediate: true },
  );

  const getFormData = async () => {
    const parties = await partiesValidateFields();
    return Promise.resolve({
      ...parties,
    });
  };
  defineExpose({ getFormData });
</script>
