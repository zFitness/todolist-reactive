import { isObservable } from "@formily/reactive";
import { ITodo, ITodoModel } from "./type";
import { Utils } from "./utils";

class TodoModel implements ITodoModel {
  public key: string;
  public todos: ITodo[];
  public onChanges: any[];

  constructor(key: string) {
    this.key = key;
    this.todos = Utils.store(key);
    this.onChanges = [];
  }

  public subscribe(onChange: any) {
    this.onChanges.push(onChange);
  }
  public inform() {
    Utils.store(this.key, this.todos);
  }

  public addTodo(title: string) {
    this.todos.push({
      id: Utils.uuid(),
      title: title,
      completed: false,
    });
    this.inform();
  }

  public toggle(todoToToggle: ITodo) {
    todoToToggle.completed = !todoToToggle.completed;
    this.inform();
  }

  public toggleAll(checked: boolean) {
    this.todos.forEach((todo) => {
      todo.completed = checked;
    });
    this.inform();
  }
  public destroy(todo: ITodo) {
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
    this.inform();
  }

  public save(todoToSave: ITodo, text: string) {
    todoToSave.title = text;
    this.inform();
  }
  public clearCompleted() {
    this.todos = this.todos.filter((item) => !item.completed);
    this.inform();
  }
}

export default TodoModel;
