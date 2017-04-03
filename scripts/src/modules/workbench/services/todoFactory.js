export default function TodoFactory() {
  return ({
    newTodo() {
      return ({
        name: "",
        description: "",
        queued: true,
        finished: false,
        type: ""
      });
    }
  })
}
