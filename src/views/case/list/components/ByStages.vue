<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="分期详情"
    destroyOnClose
    @visible-change="handleVisibleChange"
    width="400px"
    @ok="handleOk"
    :showCancelBtn="false"
    :showOkBtn="false"
  >
    <div class="pt-3px pr-3px">
      <!-- <Description
        :labelStyle="{ width: '90px' }"
        :bordered="false"
        :column="1"
        :data="mockData"
        :schema="schema"
        :contentStyle="{ color: '#666' }"
      /> -->
      <Descriptions>
        <DescriptionsItem label="首期" :contentStyle="{ color: '#666' }">
          {{ mockData.username }} {{ mockData.age }}
        </DescriptionsItem>
        <DescriptionsItem label="二期" :contentStyle="{ color: '#666' }">
          {{ mockData.username }} {{ mockData.age }}
        </DescriptionsItem>
        <DescriptionsItem label="三期" :contentStyle="{ color: '#666' }">
          {{ mockData.username }} {{ mockData.age }}
        </DescriptionsItem>
      </Descriptions>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  // import Description from '@/components/Description/src/Description.vue';
  import { Descriptions, DescriptionsItem } from 'ant-design-vue';
  import { lawsuitWorkOrderbyLawsuitId } from '@/api/biz/case';
  import { useRouter } from 'vue-router';
  import { ref, computed, unref, watch } from 'vue';
  import { useRequest } from '@vben/hooks';

  const { currentRoute } = useRouter();
  const computedParams = computed(() => unref(currentRoute).params);
  const isVisible = ref(false);

  const detail = ref({});

  const { run } = useRequest(
    () => lawsuitWorkOrderbyLawsuitId({ lawsuitId: computedParams.value.id }),
    {
      manual: true,
      ready: !!computedParams.value.id,
      refreshDeps: [computedParams.value.id],
      onSuccess: (res) => {
        detail.value = res;
      },
    },
  );

  const [register] = useModalInner((data) => {
    console.log(data, 999);
    isVisible.value = true;
    console.log(isVisible.value, computedParams.value.id, 889);
    run();
    data && onDataReceive(data);
  });

  watch(
    () => isVisible.value,
    (val) => {
      console.log(val, 999);
    },
  );

  function onDataReceive(data) {
    console.log('Data Received', data);
  }

  const mockData = ref({
    username: '张三',
    age: 18,
  });
  // TODO 根据后端返回数据进行分期渲染
  const schema = [
    {
      field: 'username',
      label: '首期',
      render: (v, data) => `123 (申请中)`,
    },
  ];

  const handleOk = () => {};
  function handleVisibleChange(v) {
    console.log(v, 888);
  }
</script>
<style lang="scss" scoped>
  .tip {
    position: absolute;
    left: 20px;
    line-height: 32px;
  }
</style>
