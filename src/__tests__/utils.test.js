import database from '../__mock__/database.json';
import { getListById } from '../utils';

const todolists = [];
Object.entries(database.todolists).forEach(
  ([key, value]) => todolists.push({ ...value, uuid: key })
);

describe('Utils', () => {
  it('expect getListById to get the correct todolist', () => {
    const expectedList = getListById(todolists, todolists[0].uuid);
    expect(expectedList).toBe(todolists[0]);
  });

  it('expect getListById to get the correct todolist 2', () => {
    const expectedList = getListById(todolists, todolists[todolists.length -1].uuid);
    expect(expectedList).toBe(todolists[todolists.length -1]);
  });

  it('expect getListById to get null if ID not found', () => {
    const expectedList = getListById(todolists, 'randomId');
    expect(expectedList).toBe(null);
  });
});
