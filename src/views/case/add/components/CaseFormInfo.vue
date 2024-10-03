<template>
  <CollapseContainer title="基础信息">
    <BasicForm @register="registerBaseInfoForm" />
  </CollapseContainer>
  <CollapseContainer title="案件信息">
    <BasicForm @register="registerCaseInfoForm" />
  </CollapseContainer>
  <CollapseContainer title="标的信息">
    <BasicForm @register="registerSubjectInfoForm" />
  </CollapseContainer>
  <CollapseContainer title="法院信息">
    <template #title>
      <Flex gap="10" align="center">
        <span>法院信息</span>
        <Switch @change="(v) => (isCourtInfo = v)" :checked="isCourtInfo" />
      </Flex>
    </template>
    <BasicForm @register="registerCourtInfoForm" />
  </CollapseContainer>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { CollapseContainer } from '@/components/Container';
  import { Switch, Flex } from 'ant-design-vue';
  import { ref } from 'vue';
  import {
    baseInfoFormSchema,
    caseInfoFormSchema,
    subjectInfoFormSchema,
    courtInfoFormSchema,
  } from './formSchame';

  const formCommonConfig = {
    labelWidth: 110,
    showActionButtonGroup: false,
    baseColProps: {
      xl: 8,
      md: 12,
      xxl: 6,
    },
    actionColOptions: {
      span: 24,
    },
  };

  const isCourtInfo = ref(true);

  /** 基础信息 */
  const [
    registerBaseInfoForm,
    { validateFields: baseInfoValidateFields, setFieldsValue: baseInfoSetFieldsValue },
  ] = useForm({
    ...formCommonConfig,
    schemas: baseInfoFormSchema,
  });
  /** 案件信息 */
  const [registerCaseInfoForm, { validateFields, setFieldsValue }] = useForm({
    ...formCommonConfig,
    schemas: caseInfoFormSchema,
  });

  /** 案件信息 */
  const [
    registerSubjectInfoForm,
    { validateFields: subjectInfoValidateFields, setFieldsValue: subjectInfoSetFieldsValue },
  ] = useForm({
    ...formCommonConfig,
    schemas: subjectInfoFormSchema,
  });

  /** 案件信息 */
  const [
    registerCourtInfoForm,
    { validateFields: courtInfoValidateFields, setFieldsValue: courtInfoSetFieldsValue },
  ] = useForm({
    ...formCommonConfig,
    schemas: courtInfoFormSchema,
  });

  const getFormData = async () => {
    const baseInfo = await baseInfoValidateFields();
    const lawsuitInfo = await validateFields();
    const subjectInfo = await subjectInfoValidateFields();
    const courtInfo = isCourtInfo.value ? await courtInfoValidateFields() : {};
    return Promise.resolve({
      baseInfo,
      lawsuitInfo,
      subjectInfo,
      courtInfo,
    });
  };
  defineExpose({ getFormData });
</script>
<style lang="scss" scoped></style>
