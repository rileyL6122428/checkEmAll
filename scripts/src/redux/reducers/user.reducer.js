import { CURRENT_USER } from "../constants/user.js";

const initialState = null;

export function CurrentUserReducer(prevState = initialState, action) {
  switch(action.type) {
    case CURRENT_USER.SET_CURRENT_USER:
      return action.payload;
    default:
      return prevState;
  }
}
