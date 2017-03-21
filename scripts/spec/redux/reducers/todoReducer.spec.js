import { TodosReducer } from '../../../src/modules/redux/reducers/todo.reducer.js';

describe("TodosReducer", () => {
  let todo1, todo2, todo3;
  beforeEach(() => {
    todo1 = { id: 1, description: "MOCK_DESCRIPTION_1" };
    todo2 = { id: 2, description: "MOCK_DESCRIPTION_2" };
    todo3 = { id: 3, description: "MOCK_DESCRIPTION_3" };
  });

  it("merges the action payload when the supplied action type is 'ADD_TODOS'", () => {
    let previousState = {};
    previousState[todo1.id] = todo1;

    let actionPayload = {};
    actionPayload[todo2.id] = todo2;
    actionPayload[todo3.id] = todo3;

    let nextState = TodosReducer(previousState, { type: "ADD_TODOS", payload: actionPayload});

    expect(Object.keys(nextState).length).toEqual(3);
    expect(nextState[todo1.id]).toBe(todo1);
    expect(nextState[todo2.id]).toBe(todo2);
    expect(nextState[todo3.id]).toBe(todo3);
  });

  it("returns the previous state when a action type is not matched", () => {
    let previousState = {};
    previousState[todo1.id] = todo1;

    let actionPayload = {};
    actionPayload[todo2.id] = todo2;
    actionPayload[todo3.id] = todo3;

    let nextState = TodosReducer(previousState, { type: "UNMATCHABLE", payload: actionPayload});

    expect(Object.keys(nextState).length).toEqual(1);
    expect(nextState[todo1.id]).toBe(todo1);
  });
});
