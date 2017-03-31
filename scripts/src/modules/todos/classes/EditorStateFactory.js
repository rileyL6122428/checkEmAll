import EditorState from './EditorState.js';

export default function EditorStateFactory($state) {
  'ngInject';

  return({
    newEditorState($apply) {
      return new EditorState($state, $apply);
    }
  });
}
