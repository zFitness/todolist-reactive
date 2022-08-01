import "./App.css";
import { observer } from "@formily/reactive-react";
import { observable } from "@formily/reactive";
import TodoItem from "./todoItem";
import { ChangeEvent, useEffect, useMemo, useRef } from "react";
import { ACTIVE_TODOS, ALL_TODOS, COMPLETED_TODOS } from "./constants";
import { ITodo, ITodoModel } from "./type";
import TodoFooter from "./footer";

const App: React.FC<{
  model: ITodoModel;
}> = ({ model }) => {
  const newFieldRef = useRef<HTMLInputElement>(null);
  const nowShowing = useMemo(() => observable.ref(ALL_TODOS), []);
  const editing = useMemo(() => observable.ref<string | null>(null), []);

  const shownTodos = model.todos.filter((todo) => {
    switch (nowShowing.value) {
      case ACTIVE_TODOS:
        return !todo.completed;
      case COMPLETED_TODOS:
        return todo.completed;
      default:
        return true;
    }
  });
  const activeTodoCount = model.todos.filter((todo) => !todo.completed).length;
  const completedCount = model.todos.length - activeTodoCount;

  console.log(activeTodoCount, completedCount)
  const toggle = (todo: ITodo) => {
    model.toggle(todo);
  };

  const destroy = (todo: ITodo) => {
    model.destroy(todo);
  };

  const edit = (todo: ITodo) => {
    editing.value = todo.id;
  };

  const save = (todoToSave: ITodo, text: string) => {
    model.save(todoToSave, text);
    editing.value = null;
  };

  const cancel = () => {
    editing.value = null;
  };

  const todoItems = shownTodos.map((todo) => {
    return (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={() => toggle(todo)}
        onDestroy={() => destroy(todo)}
        onEdit={() => edit(todo)}
        editing={editing.value === todo.id}
        onSave={(text) => save(todo, text)}
        onCancel={(e) => cancel()}
      />
    );
  });

  /**
   * 输入框回车事件
   * @param e
   * @returns
   */
  const handleNewTodoKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    const value = newFieldRef.current?.value.trim();
    if (value) {
      model.addTodo(value);
    }
  };

  /**
   * 切换所有 todo 状态
   */
  const toggleAll = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    model.toggleAll(checked);
  };

  const clearCompleted = () => {
    model.clearCompleted();
  };

  let main;
  if (model.todos.length) {
    main = (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={toggleAll}
          checked={activeTodoCount === 0}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">{todoItems}</ul>
      </section>
    );
  }

  let footer;
  if (activeTodoCount || completedCount) {
    footer = (
      <TodoFooter
        count={activeTodoCount}
        completedCount={completedCount}
        nowShowing={nowShowing.value}
        onClearCompleted={clearCompleted}
      />
    );
  }

  useEffect(() => {
    const setNowShowing = () => {
      console.log(location.hash);
      if (location.hash.includes("active")) {
        nowShowing.value = ACTIVE_TODOS;
      } else if (location.hash.includes("completed")) {
        nowShowing.value = COMPLETED_TODOS;
      } else {
        nowShowing.value = ALL_TODOS;
      }
    };
    window.addEventListener("hashchange", setNowShowing);

    return () => {
      window.removeEventListener("hashchange", setNowShowing);
    };
  }, []);

  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <input
          ref={newFieldRef}
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={(e) => handleNewTodoKeyDown(e)}
          autoFocus={true}
        />
      </header>
      {main}
      {footer}
    </div>
  );
};

export default observer(App);
