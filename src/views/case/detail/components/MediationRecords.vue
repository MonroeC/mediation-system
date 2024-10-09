<template>
  <div ref="scrollableDiv" class="scrollable-div">
    <List :bordered="true">
      <template v-for="item in cardList" :key="item.id">
        <List.Item class="list">
          <List.Item.Meta>
            <template #avatar>
              <Icon class="avatar" v-if="item.avatar" :icon="item.avatar" :color="item.avatar" />
            </template>
            <template #title>
              <span>{{ item?.actionUser?.nickname }} {{ item.title }}</span>
              <div class="time">{{ moment(item.actionTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
            </template>
            <template #description>
              <div class="description"> wwww </div>
            </template>
          </List.Item.Meta>
        </List.Item>
      </template>
    </List>
  </div>
</template>
<script lang="ts" setup>
  import { List } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { getLawsuitMediationAction } from '@/api/biz/case';
  import { useRequest } from '@vben/hooks';
  import { useRouter } from 'vue-router';
  import { computed, unref, ref, onMounted, nextTick } from 'vue';
  import moment from 'moment';

  const { currentRoute } = useRouter();
  const computedParams = computed(() => unref(currentRoute).params);
  const cardList = ref([]);

  const { loading } = useRequest(
    () =>
      getLawsuitMediationAction({
        lawsuitId: computedParams.value.id,
      }),
    {
      ready: !!computedParams.value.id,
      refreshDeps: [computedParams.value.id],
      onSuccess: (res) => {
        console.log(res);
        cardList.value = res;
      },
    },
  );
  console.log(computedParams, computedParams.value.id, 'computedParams.value.id');
  const scrollableDiv: any = ref(null);

  onMounted(() => {
    nextTick(() => {
      const divTop = scrollableDiv.value.getBoundingClientRect().top;
      const height = window.innerHeight - divTop - 46; // 20px 的间距
      scrollableDiv.value.style.height = `${height}px`;
    });
  });
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
    padding: 2px 0;
    border-radius: 4px;
    color: #666;
  }
</style>
