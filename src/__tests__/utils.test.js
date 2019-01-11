import todos from '../__mock__/todos.json';
import { filterDeleted, getListById } from '../utils';

describe('Utils', () => {

  it('expect to get non deleted todos', () => {
    const filtered = filterDeleted(todos);
    filtered.forEach(element => {
      expect(element.deleted).toBe(false || undefined);
    });
  });

  it('expect to get the correct todolist', () => {
    const expectedList = getListById(todos, todos[0].uuid);
    expect(expectedList).toBe(todos[0]);
  });
});
