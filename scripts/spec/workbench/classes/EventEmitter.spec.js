import EventEmitter from '../../../src/modules/workbench/classes/EventEmitter.js';

describe("EventEmitter", () => {
  let eventEmitter;
  beforeEach(() => {
    eventEmitter = new EventEmitter();
  });

  describe("#addListener", () => {
    let mockListener;
    beforeEach(() => {
      mockListener = jasmine.createSpy('mockListener');
    });

    it("calls the supplied listener once", () => {
      eventEmitter.addListener(mockListener);
      expect(mockListener).toHaveBeenCalled();
    });

    it("places the listener in the eventEmitter's listener hash", () => {
      eventEmitter.addListener(mockListener);

      let storedListeners = Object.values(eventEmitter.listeners);
      expect(storedListeners.length).toEqual(1);
      expect(storedListeners).toContain(mockListener);
    });

    it("returns a function that when called, removes the listener from the emitters listeners hash", () => {
      let removeListener = eventEmitter.addListener(mockListener);
      removeListener();
      let storedListeners = Object.values(eventEmitter.listeners);
      expect(storedListeners.length).toEqual(0);
    });
  });

  describe("#callListeners", () => {
    it("calls all listeners placed in the emitter", () => {
        let listeners = [
          jasmine.createSpy('listener1'),
          jasmine.createSpy('listener2'),
          jasmine.createSpy('listener3')
        ];

        listeners.forEach((listener) => {
          eventEmitter.addListener(listener);
        });

        eventEmitter.callListeners();

        listeners.forEach((listener) => {
          expect(listener).toHaveBeenCalled();
        });
    });
  });
});
