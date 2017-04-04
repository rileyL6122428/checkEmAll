export default class EventEmitter {
  constructor() {
    this.id = 0;
    this.listeners = {};
  }

  addListener(listener) {
    listener();
    this.listeners[this.id++] = listener;

    let self = this;
    return function() {
      delete self.listeners[self.id - 1];
    }
  }

  callListeners() {
    let self = this;
    Object.values(self.listeners).forEach((listener) => {
      listener();
    });
  }
}
