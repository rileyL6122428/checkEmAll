export default function NameFilter () {
  return ({
    filterList(input, entities) {
      if(input.length === 0) return entities.slice();

      let inputWords = wordsList(input);
      return entities.filter((entity) => {
        return entityNameMatchesInput(entity, inputWords);
      });
    }
  });

  function wordsList(string) {
    return string.trim().toLowerCase().split(/\s+/);
  }

  function entityNameMatchesInput(entity, inputWords) {
    for(var idx = 0; idx < inputWords.length; idx++) {
      let nextWord = inputWords[idx];
      
      if(!entity.name.trim().toLowerCase().match(new RegExp(nextWord)))
        return false;
    }

    return true;
  }
}
