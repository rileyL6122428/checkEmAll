import { addTodos } from '../../../src/modules/redux/actions/todo.action.js';

describe("addTodos", () => {
  let todosList;

  beforeEach(() => {
    todosList = [
      { id: 1, description: "MOCK_DESCRIPTION_1" },
      { id: 2, description: "MOCK_DESCRIPTION_2" }
    ]
  })

  it("returns a redux action that converts the supplied list to an id map", () => {
    let action = addTodos(todosList);
    let payload = action.payload;

    expect(Object.keys(payload).length).toEqual(2);
    expect(payload[1]).toBe(todosList[0]);
    expect(payload[2]).toBe(todosList[1]);
  });

  it("returns a redux action with action type 'ADD_TODOS'", () => {
    let action = addTodos(todosList);
    expect(action.type).toEqual("ADD_TODOS");
  });
});
