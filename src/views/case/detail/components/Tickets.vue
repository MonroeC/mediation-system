<template>
  <BasicTable
    :columns="columns"
    :dataSource="data?.list"
    size="small"
    :scroll="{ x: 900, y: 300 }"
    :loading="loading"
    :pagination="false"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'auditStatus'">
        <div>
          {{
            getDictTypeByType('apply_status')?.find((one) => one.value === record.auditStatus)
              ?.label
          }}
        </div>
      </template>
      <template v-if="column.key === 'orderType'">
        <div>
          {{
            getDictTypeByType('order_type')?.find((one) => one.value === record.orderType)?.label
          }}
        </div>
      </template>
      <template v-if="column.key === 'createTime'">
        {{ moment(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template v-if="column.key === 'action'">
        <TableAction :actions="actions(record)" style="width: 200px" />
      </template>
    </template>
  </BasicTable>
</template>
<script lang="ts" setup>
  import { BasicTable } from '@/components/Table';
  import { getLawsuitOrderPage } from '@/api/biz/case';
  import { getDictTypeByType } from '@/utils/common';
  import { useUserStore } from '@/store/modules/user';
  import moment from 'moment';
  import { useRouter } from 'vue-router';
  import { computed, unref } from 'vue';
  import { useRequest } from '@vben/hooks';

  const { currentRoute } = useRouter();
  const computedParams = computed(() => unref(currentRoute).params);

  const userStore = useUserStore();

  const userInfo = computed(() => {
    return userStore.getUserInfo || {};
  });

  const handleAction = (item, record) => {
    console.log(item, record);
  };

  const actions = computed(() => (record) => {
    const finallyButton = record.buttonList.filter((item) =>
      userInfo.value?.permissions?.includes(item.permission),
    );
    return finallyButton.map((item) => ({
      label: item.name,
      onClick: () => handleAction(item, record),
    }));
  });

  const { loading, data } = useRequest(
    () =>
      getLawsuitOrderPage({
        lawsuitId: computedParams.value.id,
        pageNo: 1,
        pageSize: 100,
      }),
    {
      ready: !!computedParams.value.id,
      refreshDeps: [computedParams.value.id],
      onSuccess: (res) => {
        console.log(res);
      },
    },
  );
  const columns = [
    {
      title: '工单编号',
      dataIndex: 'orderCode',
      width: 180,
    },
    {
      title: '状态',
      dataIndex: 'auditStatus',
    },
    {
      title: '工单类型',
      dataIndex: 'orderType',
      width: 80,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 180,
    },
    {
      title: '创建人',
      dataIndex: 'createUserName',
    },
    {
      title: '审核人',
      dataIndex: 'auditUserName',
    },
    {
      title: '操作',
      dataIndex: 'action',
    },
  ];
</script>
<style></style>
