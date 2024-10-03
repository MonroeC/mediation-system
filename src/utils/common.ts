// import { getDictDataByType } from '@/api/sys/common';
/**
 * 根据字典类型获取字典数据
 * @param type 材料字典类型
 * @returns
 */
export const getDictTypeByType = (type: string) => {
  return JSON.parse(localStorage.getItem('dictTypeSimpleList') || '[]')
    ?.filter((item) => item.dictType === type)
    ?.map((item) => ({ label: item.label, value: item.value }));
};
