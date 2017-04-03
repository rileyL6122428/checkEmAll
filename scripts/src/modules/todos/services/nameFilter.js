export default function TodoFilter () {
  return ({
    filterList(input, todos) {
      if(input.length === 0) return todos.slice();

      let inputWords = wordsList(input);
      return todos.filter((todo) => {
        return todoNameMatchesInput(todo, inputWords);
      });
    }
  });

  function wordsList(string) {
    return string.trim().toLowerCase().split(/\s+/);
  }

  function todoNameMatchesInput(todo, inputWords) {
    for(var idx = 0; idx < inputWords.length; idx++) {
      let nextWord = inputWords[idx];

      if(!todo.name.trim().toLowerCase().match(new RegExp(nextWord)))
        return false;
    }

    return true;
  }
}
