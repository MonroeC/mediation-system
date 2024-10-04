<template>
  <div v-for="(item, index) in partiesList" :key="item">
    <PartiesFormInfo
      :index="index"
      :data="item"
      :ref="setFormRef(index)"
      :handleAdd="handleAdd"
      :handleDelete="handleDelete"
      :editMode="editMode"
      :len="partiesList?.length"
    />
  </div>
</template>
<script lang="ts" setup>
  import { buildUUID } from '@/utils/uuid';
  import PartiesFormInfo from './PartiesFormInfo.vue';
  import { ref, watch, defineProps } from 'vue';

  const partiesList = ref([buildUUID()]);
  const formRefs = ref({});

  const props = defineProps({
    data: { type: Object },
    editMode: { type: String },
  });

  // 动态设置 ref
  const setFormRef = (index: number) => (el: any) => {
    if (el) {
      formRefs.value[index] = el;
    } else {
      delete formRefs.value[index];
    }
  };

  watch(
    () => props.data,
    (val) => {
      if (val) {
        partiesList.value = val?.map((item) => ({
          ...item,
          uuid: buildUUID(),
        }));
      }
    },
  );

  const handleAdd = () => {
    partiesList.value.push(buildUUID());
  };

  const handleDelete = (record) => {
    partiesList.value = partiesList.value.filter((item) => item.uuid !== record?.uuid);
  };

  const getFormData = async () => {
    const values = await Promise.all(
      partiesList.value.map(async (item, index) => {
        const form = formRefs.value[index];
        return await form.getFormData();
      }),
    );
    return Promise.resolve(values);
  };
  defineExpose({ getFormData });
</script>
