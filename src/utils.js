export const getListById = (list, uuid) => list.find(item => item.uuid === uuid) || null;
