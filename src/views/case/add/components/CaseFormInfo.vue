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
    <BasicForm @register="registerCourtInfoForm" v-show="isCourtInfo" />
  </CollapseContainer>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { CollapseContainer } from '@/components/Container';
  import { Switch, Flex } from 'ant-design-vue';
  import { ref, watch, defineProps } from 'vue';
  import moment from 'moment';

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

  const props = defineProps({
    data: { type: Object },
    editMode: { type: String },
  });

  watch(
    () => props.data,
    (val) => {
      if (val) {
        const { lawsuitInfo, baseInfo, subjectInfo, courtInfo } = val ?? {};
        const { entrustDate, entrustDeadline, ...rest } = baseInfo ?? {};
        baseInfoSetFieldsValue({
          ...rest,
          entrustDate: entrustDate ? moment(entrustDate) : undefined,
          entrustDeadline: entrustDeadline ? moment(entrustDeadline) : undefined,
        });
        courtInfo?.list?.forEach((item) => {
          courtInfoSetFieldsValue({
            [item.label]: item.value,
          });
        });
        isCourtInfo.value = courtInfo?.enabled;

        lawsuitInfo?.list?.forEach((item) => {
          if (['逾期日期', '开卡日期', '激活日期', '用印时间'].includes(item.label)) {
            item.value = item.value ? moment(item.value) : undefined;
          }
          setFieldsValue({
            [item.label]: item.value,
          });
        });

        subjectInfo?.list?.forEach((item) => {
          if (item.label === '开卡日期') {
            item.value = item.value ? moment(item.value) : undefined;
          }
          subjectInfoSetFieldsValue({
            [item.label]: item.value,
          });
        });
      }
    },
  );

  watch(
    () => props.editMode,
    (val) => {
      if (val === 'scope1') {
        const arr = [
          'entrustDate',
          'entrustDeadline',
          'lawsuitType',
          'arrearsTotal',
          'mediationCommission',
          'mediationIdentity',
          'repaymentLowestDesc',
          'repaymentLongnum',
        ];
        arr.forEach((one) => {
          baseInfoUpdateSchema({
            field: one,
            componentProps: {
              disabled: true,
            },
          });
        });
      }
    },
  );

  /** 基础信息 */
  const [
    registerBaseInfoForm,
    {
      validateFields: baseInfoValidateFields,
      setFieldsValue: baseInfoSetFieldsValue,
      updateSchema: baseInfoUpdateSchema,
    },
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
      enabled: isCourtInfo.value,
    });
  };
  defineExpose({ getFormData });
</script>
<style lang="scss" scoped></style>
