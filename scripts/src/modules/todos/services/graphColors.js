export default function TodoTypeColor() {
  return({
    convertType(type) { // TODO replace this switch by having todo types watch colors internally
      switch(type) {
        case 'work': return "#09f2e2";
        case 'chore': return "#6398ed";
        case 'project': return "#ff5d00";
        case 'study': return "#f549ff";
        case 'japanese': return "#ff00a1";
        case 'exercise': return "#fdffad";
        case 'family': return "#ffdfad";
        default: return "#e2dbce";
      }
    }
  });
}
