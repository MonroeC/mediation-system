<template>
  <Card size="small">
    <div class="page">
      <Flex justify="center">
        <Radio.Group @change="handleChangeStep" :buttonStyle="'solid'" :value="step">
          <Radio.Button value="a">案件信息</Radio.Button>
          <Radio.Button value="d">案件材料</Radio.Button>
          <Radio.Button value="b">委案方信息</Radio.Button>
          <Radio.Button value="c">当事人</Radio.Button>
        </Radio.Group>
      </Flex>
      <div class="content">
        <div size="small" v-show="step === 'a'">
          <CaseFormInfo ref="caseFormRef" :data="baseInfo" :editMode="detail.editMode" />
        </div>
        <div size="small" v-show="step === 'd'">
          <CaseMaterial ref="materialFormRef" :editMode="detail.editMode" />
        </div>
        <div size="small" v-show="step === 'b'">
          <ClientFormInfo
            ref="clientFormRef"
            :data="detail.entrustInfo"
            :editMode="detail.editMode"
          />
        </div>
        <div size="small" v-show="step === 'c'">
          <PartiesContainer
            ref="partiesFormRef"
            :data="detail.partiesList"
            :editMode="detail.editMode"
          />
        </div>
      </div>
      <Flex justify="center">
        <Space>
          <Button @click="handleCancel">取消</Button>
          <Button type="primary" @click="() => handleSave(false)">保存</Button>
          <Button type="primary" @click="() => handleSave(true)">保存并下一个</Button>
        </Space>
      </Flex>
    </div>
  </Card>
</template>
<script lang="ts" setup>
  import { Radio, Flex, Space, Button, Card, message } from 'ant-design-vue';
  import CaseFormInfo from './components/CaseFormInfo.vue';
  import ClientFormInfo from './components/ClientFormInfo.vue';
  import PartiesContainer from './components/PartiesContainer.vue';
  import CaseMaterial from './components/CaseMaterial.vue';
  import { lawsuitCreate, lawsuitDetail, lawsuitUpdate } from '@/api/biz/case';
  import { useTabs } from '@/hooks/web/useTabs';
  import { ref, onMounted, computed, unref } from 'vue';
  import { useRouter } from 'vue-router';

  const { currentRoute } = useRouter();
  const computedQuery = computed(() => unref(currentRoute).query);

  const step = ref('a');
  const caseFormRef = ref(null);
  const clientFormRef = ref(null);
  const partiesFormRef = ref(null);
  const { refreshPage, close, setTitle } = useTabs();
  const detail = ref({});

  const baseInfo = computed(() => ({
    baseInfo: detail.value.baseInfo,
    subjectInfo: detail.value.subjectInfo,
    lawsuitInfo: detail.value.lawsuitInfo,
    courtInfo: detail.value.courtInfo,
    enabled: detail.value.enabled,
  }));

  // 获取链接上的 id 参数
  onMounted(async () => {
    if (!computedQuery.value.id) return;
    setTitle('编辑案件');
    const res = await lawsuitDetail({ lawsuitId: computedQuery.value.id });
    detail.value = res;
  });

  const handleChangeStep = (e: any) => {
    step.value = e.target.value;
  };

  const transformData = (data: any) => {
    let result = [];
    Object.entries(data ?? {}).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }
      result.push({
        label: key,
        value: value,
      });
    });
    return {
      list: result,
    };
  };

  const handleSave = async (next) => {
    const baseInfo = await caseFormRef?.value?.getFormData();
    const entrustInfo = await clientFormRef.value.getFormData();
    const partiesInfo = await partiesFormRef.value.getFormData();
    const requestFun = computedQuery?.value?.id ? lawsuitUpdate : lawsuitCreate;
    await requestFun({
      baseInfo: baseInfo.baseInfo,
      subjectInfo: transformData(baseInfo.subjectInfo),
      lawsuitInfo: transformData(baseInfo.lawsuitInfo),
      courtInfo: {
        ...transformData(baseInfo.courtInfo),
        enabled: baseInfo.enabled,
      },
      entrustInfo,
      partiesList: partiesInfo,
      materialAttachmentIdList: [],
      id: computedQuery?.value?.id,
    });
    message.success('保存成功');
    if (next) {
      refreshPage();
    } else {
      close();
    }
  };
  const handleCancel = () => {
    // 取消操作
  };
</script>
<style lang="scss" scoped>
  .page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - 106px);
  }

  .content {
    flex: 1;
    overflow: auto;
  }
</style>
