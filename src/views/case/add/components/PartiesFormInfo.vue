<template>
  <div v-for="(item, index) in partiesList" :key="item">
    <CollapseContainer>
      <template #title>
        <Flex gap="10" align="center">
          <span>当事人{{ index + 1 }}信息</span>
          <Button size="small" type="primary" @click="handleAdd">添加当事人</Button>
          <Button size="small" type="primary" @click="() => handleDelete(item)">删除当事人</Button>
        </Flex>
      </template>
      <BasicForm @register="registerPartiesForm" />
    </CollapseContainer>
  </div>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { CollapseContainer } from '@/components/Container';
  import { partiesFormSchema } from './formSchame';
  import { Flex, Button } from 'ant-design-vue';
  import { buildUUID } from '@/utils/uuid';

  import { ref } from 'vue';

  const partiesList = ref([buildUUID()]);

  const handleAdd = () => {
    partiesList.value.push(buildUUID());
  };

  const handleDelete = (uuid) => {
    partiesList.value = partiesList.value.filter((item) => item !== uuid);
  };

  const [
    registerPartiesForm,
    { validateFields: partiesValidateFields, setFieldsValue: partiesSetFieldsValue },
  ] = useForm({
    labelWidth: 130,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
    schemas: partiesFormSchema,
  });
</script>
