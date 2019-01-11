import todos from '../__mock__/todos.json';
import { filterDeleted } from '../utils';

describe('Utils', () => {

  it('expect to get non deleted todos', () => {
    const filtered = filterDeleted(todos);
    filtered.forEach(element => {
      expect(element.deleted).toBe(false || undefined);
    });
  });
});
