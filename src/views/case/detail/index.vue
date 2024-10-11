<template>
  <div class="page">
    <Spin :spinning="loading">
      <Flex :style="{ width: '100%' }" :gap="8">
        <Col flex="280px">
          <Card size="small">
            <Flex justify="space-between" align="start">
              <div @click="handleToList">
                <Flex align="center" gap="4" class="back">
                  <img class="icons" :src="backPng" />
                  返回列表
                </Flex>
              </div>
              <Dropdown
                placement="bottom"
                :trigger="['hover']"
                :dropMenuList="actionsList"
                @menu-event="handleMenuEvent"
                overlayClassName="app-locale-picker-overlay"
              >
                . . .
              </Dropdown>
            </Flex>
            <Flex justify="space-between" align="start" class="mb-12">
              <div>
                <EllipsisText
                  :tooltip="detail?.baseInfo?.lawsuitName"
                  :maxWidth="220"
                  class="case-title"
                  >{{ detail?.baseInfo?.lawsuitName }}</EllipsisText
                >
                <div class="case-mobile">782577551</div>
              </div>
              <Tag style="margin-right: 0">{{
                getDictTypeByType('lawsuit_status')?.find((one) => one.value === detail?.status)
                  ?.label
              }}</Tag>
            </Flex>
            <div class="mb-12">
              <Tag v-for="item in tagLists" :key="item">{{ item }}</Tag>
              <Tag v-show="isCanSetTag" @click="() => handleOpenSetTag()">+标签</Tag>
            </div>
            <Input
              class="mb-12"
              :readonly="true"
              @click="handleRemark"
              :value="detail.mediationRemark"
              placeholder="请输入调解诉求备注"
            />
            <Flex gap="12">
              <div class="icons-container" v-show="isCanCall">
                <img class="icons" :src="phonePng" />
              </div>
              <div class="icons-container" v-show="isCanMessage">
                <img class="icons" :src="envelopePng" />
              </div>
            </Flex>
            <Divider class="mb-8 mt-16" />
            <ScrollContainer>
              <Tabs
                size="small"
                :tabBarGutter="12"
                :destroyInactiveTabPane="true"
                @change="handleChangeTab"
              >
                <template v-for="item in baseTabs" :key="item.key">
                  <TabPane :tab="item.name">
                    <component :is="Components[index]" :detail="detail" />
                  </TabPane>
                </template>
              </Tabs>
            </ScrollContainer>
          </Card>
        </Col>
        <Col flex="1" :style="{ 'min-width': '700px' }">
          <Card size="small">
            <Process :detail="detail" :ok="refresh" />
            <CaseFollowUp />
          </Card>
        </Col>
        <Col flex="350px">
          <Flex vertical gap="12">
            <Partys flex="50%" :detail="detail" />
            <EntrustInfo flex="50%" :detail="detail" />
          </Flex>
        </Col>
      </Flex>
      <Remark @register="registerOpenRemark" :ok="refresh" />
    </Spin>
    <Freeze @register="registerFreeze" :ok="refresh" />
    <SetTag @register="registerSetTag" :ok="refresh" />
  </div>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, reactive, markRaw } from 'vue';
  import { Flex, Col, Card, Tag, Input, Divider, Tabs, Spin } from 'ant-design-vue';
  import { useModal } from '@/components/Modal';
  import { ScrollContainer } from '@/components/Container';
  import Freeze from '/@/views/case/list/components/Freeze.vue';
  import SetTag from '/@/views/case/list/components/SetTag.vue';
  import Dropdown from '@/components/Dropdown/src/Dropdown.vue';
  import { EllipsisText } from '@/components/EllipsisText';
  import BasicInfo from './components/BasicInfo.vue';
  import CaseInfo from './components/CaseInfo.vue';
  import TargetInfo from './components/TargetInfo.vue';
  import CourtInfo from './components/CourtInfo.vue';
  import CaseFollowUp from './components/CaseFollowUp.vue';
  import Remark from './components/Remark.vue';
  import Process from './components/Process.vue';
  import Partys from './components/Partys.vue';
  import phonePng from '/resource/icons/phone.png';
  import { useRouter } from 'vue-router';
  import { lawsuitDetail, getLawsuitTag } from '@/api/biz/case';
  import envelopePng from '/resource/icons/envelope.png';
  import backPng from '/resource/icons/back.png';
  import { getDictTypeByType } from '@/utils/common';
  import { useRequest } from '@vben/hooks';
  import EntrustInfo from './components/EntrustInfo.vue';
  import { useUserStore } from '@/store/modules/user';
  import { useGo } from '@/hooks/web/usePage';

  const TabPane = Tabs.TabPane;

  const { currentRoute } = useRouter();
  const computedParams = computed(() => unref(currentRoute).params);
  const detail = reactive<any>({});
  const tagLists = ref<any[]>([]);
  const index = ref(0);
  const isCanCall = ref(false);
  const isCanMessage = ref(false);
  const isCanRemark = ref(false);
  const isCanSetTag = ref(false);

  /** 冻结 */
  const [registerFreeze, { openModal: openFreeze }] = useModal();
  /** 打标 */
  const [registerSetTag, { openModal: openSetTag }] = useModal();

  const count = ref(0);
  const refresh = () => {
    count.value++;
  };
  const userStore = useUserStore();
  const go = useGo();

  const userInfo: any = computed(() => {
    return userStore.getUserInfo || {};
  });

  /** 打开冻结 */
  const handleOpenFreeze = () => {
    openFreeze(true, [
      {
        ...detail,
        lawsuitName: detail.baseInfo.lawsuitName,
      },
    ]);
  };

  /** 打开打标 */
  const handleOpenSetTag = () => {
    openSetTag(true, [
      {
        ...detail,
        tagList: tagLists.value,
      },
    ]);
  };

  const handleChangeTab = (key: string) => {
    index.value = Number(key);
  };

  const { loading } = useRequest(() => lawsuitDetail({ lawsuitId: computedParams.value.id }), {
    ready: !!computedParams.value.id,
    refreshDeps: [count],
    onSuccess: async (res) => {
      detail.baseInfo = res.baseInfo;
      detail.buttonList = res.buttonList;
      detail.courtInfo = res.courtInfo;
      detail.lawsuitInfo = res.lawsuitInfo;
      detail.targetInfo = res.targetInfo;
      detail.partiesList = res.partiesList;
      detail.status = res.status;
      detail.subjectInfo = res.subjectInfo;
      detail.entrustInfo = res.entrustInfo;
      detail.mediationRemark = res.mediationRemark;
      detail.entrustCustomer = res.entrustCustomer;

      const tagList = await getLawsuitTag({ lawsuitId: computedParams.value.id as number });
      tagLists.value = tagList;

      const buttonCodes = res.buttonList.map((item: any) => item.code);
      if (
        buttonCodes?.includes('lawsuit_freeze') &&
        userInfo.value?.permissions?.includes('biz:lawsuit:freeze')
      ) {
        actionsList.value.push({
          event: 'freeze',
          text: '冻结',
        });
      }
      if (
        buttonCodes?.includes('lawsuit_edit') &&
        userInfo.value?.permissions?.includes('biz:lawsuit:edit')
      ) {
        actionsList.value.push({
          event: 'edit',
          text: '编辑',
        });
      }
      isCanCall.value =
        buttonCodes?.includes('lawsuit_call') &&
        userInfo.value?.permissions?.includes('biz:lawsuit:call');
      isCanMessage.value =
        buttonCodes?.includes('lawsuit_sms') &&
        userInfo.value?.permissions?.includes('biz:lawsuit:sms');
      isCanRemark.value =
        userInfo.value?.permissions?.includes('biz:lawsuit:mediation-remark') &&
        buttonCodes?.includes('lawsuit_mediation_remark');
      isCanSetTag.value =
        userInfo.value?.permissions?.includes('biz:lawsuit:set-tag') &&
        buttonCodes?.includes('lawsuit_set_tag');

      console.log('isCanSetTag', isCanSetTag.value);
    },
  });

  /** 案件确认 */
  const [registerOpenRemark, { openModal: openRemark }] = useModal();

  const actionsList = ref<any>([]);

  const Components = ref<any[]>([
    markRaw(BasicInfo),
    markRaw(CaseInfo),
    markRaw(TargetInfo),
    markRaw(CourtInfo),
  ]);

  const baseTabs = reactive([
    {
      name: '基本信息',
      forceRender: true,
      key: 0,
    },
    {
      name: '案件信息',
      forceRender: true,
      key: 1,
    },
    {
      name: '标的信息',
      forceRender: true,
      key: 2,
    },
    {
      name: '法院信息',
      forceRender: true,
      key: 3,
    },
  ]);

  /** 编辑和冻结 */
  function handleMenuEvent(menu: any) {
    console.log('menu', menu);
    if (menu.event === 'edit') {
      go(`/case/add?id=${computedParams.value.id}`);
    } else if (menu.event === 'freeze') {
      handleOpenFreeze();
    }
  }

  /** 返回列表 */
  const handleToList = () => {
    go('/case/list');
  };

  /** 备注 */
  const handleRemark = () => {
    if (!isCanRemark.value) {
      return;
    }
    openRemark(true, { lawsuitId: computedParams.value.id });
  };
</script>
<style lang="scss" scoped>
  .page {
    padding: 8px;
  }

  .back {
    margin-bottom: 16px;
    cursor: pointer;
  }

  .mb-12 {
    margin-bottom: 12px;
  }

  .mt-16 {
    margin-top: 16px;
  }

  .mb-8 {
    margin-bottom: 8px;
  }

  .case-title {
    font-size: 16px;
    font-weight: 700;
  }

  .case-mobile {
    color: #999;
    font-size: 14px;
  }

  .icons {
    display: inline-block;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .icons-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 100%;
    background-color: rgb(207 209 207 / 30%);
  }
</style>
