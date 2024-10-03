<template>
  <div class="page">
    <Flex justify="center">
      <Radio.Group @change="handleChangeStep" :buttonStyle="'solid'" :value="step">
        <Radio.Button value="a">案件信息</Radio.Button>
        <Radio.Button value="b">委案方信息</Radio.Button>
        <Radio.Button value="c">当事人</Radio.Button>
      </Radio.Group>
    </Flex>
    <div class="content">
      <div size="small" v-show="step === 'a'"><CaseFormInfo ref="caseFormRef" /> </div>
      <div size="small" v-show="step === 'b'"><ClientFormInfo ref="clientFormRef" /> </div>
      <div size="small" v-show="step === 'c'"><PartiesFormInfo ref="partiesFormRef" /></div>
    </div>
    <Flex justify="center">
      <Space>
        <Button @click="handleCancel">取消</Button>
        <Button type="primary" @click="handleSave">保存</Button>
        <Button type="primary" @click="handleSaveAndNext">保存并下一个</Button>
      </Space>
    </Flex>
  </div>
</template>
<script lang="ts" setup>
  import { Radio, Flex, Space, Button } from 'ant-design-vue';
  import CaseFormInfo from './components/CaseFormInfo.vue';
  import ClientFormInfo from './components/ClientFormInfo.vue';
  import PartiesFormInfo from './components/PartiesFormInfo.vue';

  import { ref } from 'vue';

  const step = ref('a');
  const caseFormRef = ref(null);
  const clientFormRef = ref(null);
  const partiesFormRef = ref(null);

  const handleChangeStep = (e: any) => {
    step.value = e.target.value;
  };

  const handleSave = async () => {
    const baseInfo = await caseFormRef?.value?.getFormData();
    // const clientInfo = clientFormRef.value.getFormData();
    // const partiesInfo = partiesFormRef.value.getFormData();

    console.log(baseInfo, 'baseInfo');
    // 保存操作
  };
</script>
<style lang="scss" scoped>
  .page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - 106px);
    margin: 12px;
    padding: 12px;
    background: #fff;
  }

  .content {
    flex: 1;
    overflow: auto;
  }
</style>
