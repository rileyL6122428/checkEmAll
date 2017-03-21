import { CurrentUserReducer } from "../../../src/modules/redux/reducers/user.reducer.js";
import { CURRENT_USER } from "../../../src/modules/redux/constants/user.js";

describe("CurrentUserReducer", () => {
  it("returns the payload when given an action of type 'SET_CURRENT_USER'", () => {
    let action = { type: CURRENT_USER.SET_CURRENT_USER, payload: "MOCK" };
    let prevState = null;

    let currentUser = CurrentUserReducer(prevState, action)

    expect(currentUser).toBe(action.payload);
  });

  it("returns the previous state when an unrecognizable action type is supplied", () => {
    let action = { type: "UNRECOGNIZED_TYPE", payload: "MOCK" };
    let prevState = null;

    let currentUser = CurrentUserReducer(prevState, action)

    expect(currentUser).toBe(null);
  })
});
