<template>
  <List :bordered="true">
    <template v-for="item in cardList" :key="item.id">
      <List.Item class="list">
        <List.Item.Meta>
          <template #avatar>
            <Icon class="avatar" v-if="item.avatar" :icon="item.avatar" :color="item.avatar" />
          </template>
          <template #title>
            <span>{{ item.name }}</span>
            <div class="time">2024-12-22 22:12:12</div>
          </template>
          <template #description>
            <div class="description"> wwww </div>
          </template>
        </List.Item.Meta>
      </List.Item>
    </template>
  </List>
</template>
<script lang="ts" setup>
  import { List, Flex } from 'ant-design-vue';
  import Icon from '@/components/Icon/Icon.vue';

  const cardList = [
    {
      name: 'xxx',
      id: 1,
    },
  ];
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
