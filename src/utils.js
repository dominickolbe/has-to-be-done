export const getListById = (list, uuid) => list.find(item => item.uuid === uuid) || null;

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  return result.splice(endIndex, 0, removed);
};
