export default class EventEmitter {
  constructor() {
    this._nextListenerId = 0;
    this._listeners = {};
  }

  addListener(listener) {
    listener();

    let listenerId = this._nextListenerId++;
    this._listeners[listenerId] = listener;

    return () => delete this._listeners[listenerId];
  }

  callListeners() {
    let self = this;
    Object.values(self._listeners).forEach((listener) => listener());
  }
}
