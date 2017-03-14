import { setCurrentUser } from "../../../src/redux/actions/user.action.js";
import { CURRENT_USER } from "../../../src/redux/constants/user.js";

describe("UserActions", () => {
  describe("#setCurrentUser", () => {
    it("returns the provided payload with the appropriate action type", () => {
      let currentUser = { id: 1, username: "USERNAME" };
      let action = setCurrentUser(currentUser);
      expect(action.payload).toBe(currentUser);
      expect(action.type).toBe(CURRENT_USER.SET_CURRENT_USER);
    });
  });
});
