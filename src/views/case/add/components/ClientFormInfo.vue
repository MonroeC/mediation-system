<template>
  <CollapseContainer title="委案方信息" style="position: relative">
    <BasicForm @register="clientInfoForm" />
    <Flex gap="16" class="action">
      <a @click="() => handleOpenAddClient({ type: 'add' })">添加委案方</a>
      <a @click="() => handleOpenAddClient({ type: 'look' })">查看委案方</a>
    </Flex>
  </CollapseContainer>
  <CollapseContainer>
    <template #title>
      <Flex gap="10" align="center">
        <span>代理人</span>
        <Switch @change="(v) => (entrustAgentEnabled = v)" :checked="entrustAgentEnabled" />
      </Flex>
    </template>
    <BasicForm @register="registerEntrustAgentForm" />
  </CollapseContainer>
  <CollapseContainer>
    <template #title>
      <Flex gap="10" align="center">
        <span>被送达人</span>
        <Switch @change="(v) => (entrustSenderEnabled = v)" :checked="entrustSenderEnabled" />
      </Flex>
    </template>
    <BasicForm @register="registerEntrustSenderForm" />
  </CollapseContainer>
  <AddClient @register="registerAddClient" />
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { CollapseContainer } from '@/components/Container';
  import { Switch, Flex, Button } from 'ant-design-vue';
  import { useModal } from '@/components/Modal';
  import AddClient from '@/views/client/list/components/addClient.vue';

  import { ref } from 'vue';
  import {
    entrustAgentFormSchema,
    entrustSenderFormSchema,
    clientInfoFormSchema,
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
  /** 代理人是否开启 */
  const entrustAgentEnabled = ref(true);
  /** 被送达人是否开启 */
  const entrustSenderEnabled = ref(true);

  /** 委案方信息 */
  const [
    clientInfoForm,
    { validateFields: clientInfoValidateFields, setFieldsValue: clientInfoSetFieldsValue },
  ] = useForm({
    ...formCommonConfig,
    schemas: clientInfoFormSchema,
  });

  /** 代理人信息 */
  const [
    registerEntrustAgentForm,
    { validateFields: entrustAgentValidateFields, setFieldsValue: entrustAgentSetFieldsValue },
  ] = useForm({
    ...formCommonConfig,
    schemas: entrustAgentFormSchema,
  });

  /** 被送达人 */
  const [
    registerEntrustSenderForm,
    { validateFields: entrustSenderValidateFields, setFieldsValue: entrustSenderSetFieldsValue },
  ] = useForm({
    ...formCommonConfig,
    schemas: entrustSenderFormSchema,
  });

  /** 添加委案方 */
  const [registerAddClient, { openModal: openAddClient }] = useModal();

  /** 打开添加委案方 */
  const handleOpenAddClient = ({ type }) => {
    openAddClient(true, { type });
  };
</script>
<style lang="scss" scoped>
  .action {
    position: absolute;
    top: 56px;
    left: 410px;
  }
</style>
