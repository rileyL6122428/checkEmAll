export default class EventEmitter {
  constructor() {
    this.id = 0;
    this.listeners = {};
  }

  callListeners() {
    let self = this;
    Object.values(self.listeners).forEach((listener) => {
      listener();
    });
  }

  addListener(listener) {
    listener();
    this.listeners[this.id++] = listener;

    let self = this;
    return function() {
      delete self.listeners[self.id - 1];
    }
  }
}
