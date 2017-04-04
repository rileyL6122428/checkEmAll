import EventEmitter from '../../../src/modules/workbench/classes/EventEmitter.js';

describe("EventEmitter", () => {
  let eventEmitter;
  beforeEach(() => {
    eventEmitter = new EventEmitter();
  });

  describe("#addListener", () => {
    it("calls the supplied listener once", () => {
      let mockListener = jasmine.createSpy('mockListener');
      eventEmitter.addListener(mockListener);
      expect(mockListener).toHaveBeenCalled();
    });

    it("places the listener in the eventEmitter's listener hash", () => {
      let mockListener = jasmine.createSpy('mockListener');

      eventEmitter.addListener(mockListener);

      let storedListeners = Object.values(eventEmitter._listeners);
      expect(storedListeners.length).toEqual(1);
      expect(storedListeners).toContain(mockListener);
    });

    it("returns a function that when called, removes the corresponding listener from the emitters listeners hash", () => {
      let mockListener1 = jasmine.createSpy('mockListener1');
      let mockListener2 = jasmine.createSpy('mockListener2');
      let mockListener3 = jasmine.createSpy('mockListener3');
      let mocklistener4 = jasmine.createSpy('mocklistener4');

      let removeListener1 = eventEmitter.addListener(mockListener1);
      let removeListener2 = eventEmitter.addListener(mockListener2);
      let removeListener3 = eventEmitter.addListener(mockListener3);
      let removeListener4 = eventEmitter.addListener(mocklistener4);

      removeListener1();
      removeListener3();

      let storedListeners = Object.values(eventEmitter._listeners);
      expect(storedListeners.length).toEqual(2);
      expect(storedListeners).toContain(mockListener2);
      expect(storedListeners).toContain(mocklistener4);
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
