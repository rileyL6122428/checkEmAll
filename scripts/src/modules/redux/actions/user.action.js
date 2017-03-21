import { CURRENT_USER } from '../constants/user.js';

function setCurrentUser(user) {
  return ({
    type: CURRENT_USER.SET_CURRENT_USER,
    payload: user
  });
}

export { setCurrentUser };
