import { isObservable } from "@formily/reactive";
import { ITodo, ITodoModel } from "./type";
import { Utils } from "./utils";

class TodoModel implements ITodoModel {
  public key: string;
  public todos: ITodo[];
  public onChanges: any[];

  constructor(keys: string, todos: ITodo[] = [], onChanges: any[] = []) {
    this.key = keys;
    this.todos = todos;
    this.onChanges = onChanges;
  }

  public subscribe(onChange: any) {}
  public inform() {}

  public addTodo(title: string) {
    this.todos.push({
      id: Utils.uuid(),
      title: title,
      completed: false,
    });
  }

  public toggle(todoToToggle: ITodo) {
    todoToToggle.completed = !todoToToggle.completed;
  }

  public toggleAll(checked: boolean) {
    this.todos.forEach((todo) => {
      todo.completed = checked;
    });
  }
  public destroy(todo: ITodo) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
  }

  public save(todoToSave: ITodo, text: string) {
    todoToSave.title = text;
  }
  public clearCompleted() {
    this.todos = this.todos.filter(item => !item.completed)
  }
}

export default TodoModel;
