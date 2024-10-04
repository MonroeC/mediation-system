<template>
  <div class="page">
    <Flex :style="{ width: '100%' }" :gap="8">
      <Col flex="280px">
        <Card size="small">
          <Flex justify="space-between" align="start">
            <Flex @click="handleToList" align="center" gap="4" class="back">
              <img class="icons" :src="backPng" />
              返回列表
            </Flex>
            <!-- <Button type="link"></Button> -->
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
              <EllipsisText :maxWidth="220" class="case-title">王五信用卡纠纷王</EllipsisText>
              <div class="case-mobile">782577551</div>
            </div>
            <Tag style="margin-right: 0">调节中</Tag>
          </Flex>
          <div class="mb-12">
            <Tag>标签 1</Tag>
            <Tag>标签 2</Tag>
          </div>
          <Input
            class="mb-12"
            :readonly="true"
            @click="handleRemark"
            placeholder="请输入调解诉求备注"
          />
          <Flex gap="12">
            <div class="icons-container">
              <img class="icons" :src="phonePng" />
            </div>
            <div class="icons-container">
              <img class="icons" :src="envelopePng" />
            </div>
          </Flex>
          <Divider class="mb-8 mt-16" />
          <ScrollContainer>
            <Tabs size="small" :tabBarGutter="12">
              <template v-for="item in baseTabs" :key="item.key">
                <TabPane :tab="item.name">
                  <component :is="item.component" />
                </TabPane>
              </template>
            </Tabs>
          </ScrollContainer>
        </Card>
      </Col>
      <Col flex="1" :style="{ 'min-width': '700px' }">
        <Card size="small">
          <Process />
          <CaseFollowUp />
        </Card>
      </Col>
      <Col flex="350px">
        <Flex vertical gap="12">
          <Partys flex="50%" />
          <ClientInfo flex="50%" />
        </Flex>
      </Col>
    </Flex>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { Flex, Col, Card, Tag, Input, Divider, Tabs } from 'ant-design-vue';
  import { ScrollContainer } from '@/components/Container';
  import Dropdown from '@/components/Dropdown/src/Dropdown.vue';
  import { EllipsisText } from '@/components/EllipsisText';
  import BasicInfo from './components/BasicInfo.vue';
  import CaseInfo from './components/CaseInfo.vue';
  import TargetInfo from './components/TargetInfo.vue';
  import CourtInfo from './components/CourtInfo.vue';
  import CaseFollowUp from './components/CaseFollowUp.vue';
  import Process from './components/Process.vue';
  import Partys from './components/Partys.vue';
  import ClientInfo from './components/ClientInfo.vue';
  import phonePng from '/resource/icons/phone.png';
  import envelopePng from '/resource/icons/envelope.png';
  import backPng from '/resource/icons/back.png';

  const TabPane = Tabs.TabPane;
  const detail = ref<any>({});

  const actionsList = [
    {
      event: 'edit',
      text: '编辑',
    },
    {
      event: 'freeze',
      text: '冻结',
    },
  ];

  const baseTabs = ref([
    {
      name: '基本信息',
      component: BasicInfo,
      key: '1',
    },
    {
      name: '案件信息',
      component: CaseInfo,
      key: '2',
    },
    {
      name: '标的信息',
      component: TargetInfo,
      key: '3',
    },
    {
      name: '法院信息',
      component: CourtInfo,
      key: '4',
    },
  ]);

  // 获取链接上的 id 参数
  onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search);
  });

  /** 编辑和冻结 */
  function handleMenuEvent(menu: any) {
    console.log('menu', menu);
  }

  /** 返回列表 */
  const handleToList = () => {
    console.log('handleToList');
  };

  /** 备注 */
  const handleRemark = () => {
    console.log('handleRemark');
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
