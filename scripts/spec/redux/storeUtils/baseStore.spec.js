import BaseStore from '../../../src/modules/redux/storeUtils/baseStore.js';

describe("BaseStore", () => {
  let baseStore, ngReduxMock;

  beforeEach(() => {
    ngReduxMock = { subscribe: jasmine.createSpy('subscribe') };
    baseStore = new BaseStore(ngReduxMock);
  });

  describe("#placeListener", () => {
    it("immediately calls the listener", () => {
      let listener = jasmine.createSpy('listener');
      baseStore.placeListener(listener);
      expect(listener).toHaveBeenCalled();
    });

    it("sets up a store subscription by delegating to '$ngRedux.subscribe'", () => {
      let listener = jasmine.createSpy('listener');
      baseStore.placeListener(listener);
      expect(ngReduxMock.subscribe).toHaveBeenCalledWith(listener);
    });

    it("returns the unsubscription token returned from '$ngRedux.subscribe'", () => {
      let removeListener = jasmine.createSpy('removeListener');
      ngReduxMock.subscribe.and.returnValue(removeListener);
      let listener = jasmine.createSpy('listener');
      baseStore.placeListener(listener);
      expect(ngReduxMock.subscribe).toHaveBeenCalledWith(listener);
    });
  });
});
