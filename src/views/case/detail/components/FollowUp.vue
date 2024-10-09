<template>
  <div ref="scrollableDiv" class="scrollable-div">
    <List size="small" :loading="loading">
      <template v-for="item in data" :key="item.id">
        <List.Item class="list">
          <List.Item.Meta>
            <template #avatar>
              <Icon class="avatar" v-if="item.avatar" :icon="item.avatar" :color="item.avatar" />
            </template>
            <template #title>
              <Flex justify="space-between">
                <span>{{ item.actionUser?.nickname }}</span>
                <div class="time">{{ moment(item.actionTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
              </Flex>
            </template>
            <template #description>
              <Flex class="description" vertical gap="4">
                <div>{{ item.title }}</div>
                <div v-for="subItem in item.infoList">{{ subItem }}</div>
                <div>
                  <Tag v-for="subItem in item.tagList">{{ subItem }}</Tag>
                </div>
                <div v-for="subItem in item.recordContent"
                  ><Tag>{{ subItem }}</Tag></div
                >
              </Flex>
            </template>
          </List.Item.Meta>
        </List.Item>
      </template>
    </List>
  </div>
</template>
<script lang="ts" setup>
  import { List, Flex, Tag } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { getLawsuitFollowAction } from '@/api/biz/case';
  import { useRouter } from 'vue-router';
  import { computed, unref, ref, onMounted, nextTick } from 'vue';
  import { useRequest } from '@vben/hooks';
  import moment from 'moment';

  const { currentRoute } = useRouter();
  const computedParams: any = computed(() => unref(currentRoute).params);
  const scrollableDiv: any = ref(null);

  onMounted(() => {
    nextTick(() => {
      const divTop = scrollableDiv.value.getBoundingClientRect().top;
      const height = window.innerHeight - divTop - 46; // 20px 的间距
      scrollableDiv.value.style.height = `${height}px`;
      scrollableDiv.value.style.overflowY = 'auto';
    });
  });

  const { loading, data } = useRequest(
    () =>
      getLawsuitFollowAction({
        lawsuitId: computedParams.value.id,
      }),
    {
      ready: !!computedParams.value.id,
      refreshDeps: [computedParams.value.id],
      onSuccess: (res) => {
        console.log(res);
      },
    },
  );
</script>
<style lang="scss" scoped>
  .avatar {
    font-size: 32px !important;
  }

  .time {
    color: #666;
    font-size: 12px;
    font-weight: 400;
  }

  .description {
    padding: 6px 12px;
    border: solid 1px #eee;
    border-radius: 4px;
    color: #333;
  }
</style>
