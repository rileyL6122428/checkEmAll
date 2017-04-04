import EventEmitter from './EventEmitter.js';

export default function EventEmitterFactory() {
  return ({
    newEventEmitter() {
      return new EventEmitter();
    }
  });
}
