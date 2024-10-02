/**
 * 根据字典类型获取字典数据
 * @param type 材料字典类型
 * @returns
 */
export const getDictTypeByType = (type: string) => {
  return JSON.parse(localStorage.getItem('dictTypeSimpleList') || '[]')
    ?.filter((item) => item.type === type)
    ?.map((item) => ({ label: item.name, value: item.id }));
};
