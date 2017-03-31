export default function SelectedTodoHolder() {
  let selectedTodo = null;
  return({
    setSelectedTodo(todo) {
      selectedTodo = todo;
    },

    getSelectedTodo() {
      return selectedTodo;
    }
  })
}
