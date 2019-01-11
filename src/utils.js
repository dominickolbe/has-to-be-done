export const filterDeleted = list => list.filter(item => !item.deleted);

export const getListById = (list, uuid) => list.find(item => item.uuid === uuid);
