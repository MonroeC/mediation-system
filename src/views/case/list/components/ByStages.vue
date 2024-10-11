<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="分期详情"
    destroyOnClose
    width="400px"
    @ok="handleOk"
    :showCancelBtn="false"
    :showOkBtn="false"
    :footer="[]"
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
      <Descriptions :column="1">
        <DescriptionsItem
          :contentStyle="{ color: '#666' }"
          v-for="(item, index) in detail?.closeStageOrder?.stageList"
          :key="index"
          :label="item.stageNum + '期'"
        >
          <Space>
            <div>{{ item.payDate ? moment(item.payDate).format('YYYY-MM-DD HH:mm:ss') : '' }}</div>
            <div>¥{{ item.payAmount }}</div>
            <div v-show="item.stageApplyStatus === 'no_apply'"
              >（<span
                :style="{ color: isApplyStage ? 'green' : '#666' }"
                @click="() => handleOpenApplyStatges(item)"
                >申请结算</span
              >）
            </div>
            <div v-show="item.stageApplyStatus === 'applying'"
              >（<span
                :style="{ color: isAuditStage ? 'blue' : '#666' }"
                @click="() => handleOpenAdiutStatges(item)"
                >申请中</span
              >）
            </div>
            <div v-show="item.stageApplyStatus === 'apply_reject'"
              >（<span @click="() => handleOpenApplyStatges(item)">（申请失败）</span>）
            </div>
            <div v-show="item.stageApplyStatus === 'apply_success'"
              >（<span @click="() => handleOpenApplyStatges(item)">申请成功</span>）
            </div>
          </Space>
        </DescriptionsItem>
      </Descriptions>
    </div>
    <ApplyStatges @register="registerApplyStatges" :ok="ok" :lawsuitId="computedParam?.value?.id" />
    <AuditStage @register="registerAdiutStatges" :ok="ok" :lawsuitId="computedParam?.value?.id" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  // import Description from '@/components/Description/src/Description.vue';
  import { Descriptions, DescriptionsItem, Space } from 'ant-design-vue';
  import { lawsuitWorkOrderbyLawsuitId } from '@/api/biz/case';
  import ApplyStatges from './ApplyStatges.vue';
  import { useRouter } from 'vue-router';
  import { ref, computed, unref, watch } from 'vue';
  import { useRequest } from '@vben/hooks';
  import AuditStage from './Adiut/Stage.vue';
  import moment from 'moment';
  import { useUserStore } from '@/store/modules/user';

  /** 申请分期审核 */
  const [registerApplyStatges, { openModal: openApplyStatges }] = useModal();
  const [registerAdiutStatges, { openModal: openAdiutStatges }] = useModal();

  const { currentRoute } = useRouter();
  const computedParams = computed(() => unref(currentRoute).params);
  const userStore = useUserStore();
  const userInfo = computed(() => {
    return userStore.getUserInfo || {};
  });

  const permissions = userInfo.value?.permissions;
  // 申请结算权限
  const isApplyStage = permissions?.includes('biz:lawsuit:apply-stage');
  // 结算中操作权限
  const isAuditStage = permissions?.includes('biz:lawsuit:audit-stage');

  const isVisible = ref(false);

  const detail = ref({});

  const ok = () => {
    run();
  };

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
    isVisible.value = true;
    run();
    data && onDataReceive(data);
  });

  const handleOpenApplyStatges = (item) => {
    if (!isApplyStage) {
      return;
    }
    openApplyStatges(true, {
      itemData: item,
      data: detail.value,
    });
  };

  const handleOpenAdiutStatges = (item) => {
    if (!isAuditStage) {
      return;
    }
    openAdiutStatges(true, {
      itemData: item,
      data: detail.value,
    });
  };

  watch(
    () => isVisible.value,
    (val) => {
      console.log(val, 999);
    },
  );

  function onDataReceive(data) {
    console.log('Data Received', data);
  }

  const handleOk = () => {};
</script>
<style lang="scss" scoped>
  .tip {
    position: absolute;
    left: 20px;
    line-height: 32px;
  }
</style>
