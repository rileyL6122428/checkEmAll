export default class EventEmitter {
  constructor() {
    this.nextListenerId = 0;
    this.listeners = {};
  }

  addListener(listener) {
    listener();

    let listenerId = this.nextListenerId++;
    this.listeners[listenerId] = listener;

    return () => delete this.listeners[listenerId];
  }

  callListeners() {
    let self = this;
    Object.values(self.listeners).forEach((listener) => listener());
  }
}
