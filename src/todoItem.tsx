import { observable } from "@formily/reactive";
import { observer } from "@formily/reactive-react";
import classNames from "classnames";
import * as React from "react";
import { useEffect, useMemo, useRef } from "react";
import { ENTER_KEY, ESCAPE_KEY } from "./constants";
import { ITodoItemProps } from "./type";

const TodoItem: React.FC<ITodoItemProps> = ({
  todo,
  onSave,
  onDestroy,
  onEdit,
  onCancel,
  editing,
  onToggle,
}) => {
  const editFieldRef = useRef<HTMLInputElement>(null);
  const editText = useMemo(() => observable.ref(todo.title), []);
  const handleSubmit = (event: React.FormEvent) => {
    var val = editText.value.trim();
    if (val) {
      onSave(val);
      editText.value = val;
    } else {
      onDestroy();
    }
  };

  const handleEdit = () => {
    onEdit();
    editText.value = todo.title;
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Esc') {
      editText.value = todo.title;
      onCancel(event);
    } else if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleChange = (event: React.FormEvent) => {
    var input: any = event.target;
    editText.value = input.value;
  };

  useEffect(() => {
    if (editing && editFieldRef.current) {
      const value = editFieldRef.current.value;
      editFieldRef.current.focus();
      editFieldRef.current.setSelectionRange(value.length, value.length);
    }
  }, [editing]);

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: editing,
      })}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
        />
        <label onDoubleClick={(e) => handleEdit()}>{todo.title}</label>
        <button className="destroy" onClick={onDestroy} />
      </div>
      <input
        ref={editFieldRef}
        className="edit"
        value={editText.value}
        onBlur={(e) => handleSubmit(e)}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => handleKeyDown(e)}
      />
    </li>
  );
};

export default observer(TodoItem);
