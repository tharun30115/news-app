import { useState } from "react";
import "./CSS/Todo.css";
import { useRef } from "react";
import { useEffect } from "react";
import TodoItems from "./TodoItems";

let count = 0;
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const add = () => {
    setTodos([
      ...todos,
      {no:count++, text:inputRef.current.value, display:"" },
    ]);
    inputRef.current.value = "";
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <div className="todo">
      <div className="todo-header">To-Do List</div>
      <div className="todo-add">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add your task"
          className="todo-input"
        />
        <div
          onClick={() => {
            add;
          }}
          className="todo-add-btn"
        >
          Add
        </div>
      </div>
      <div className="todo-list">
        {todos.map((item,index)=>{
            return <TodoItems key={index} no={item.no} display={item.display} text={item.text} />
        })}
      </div>
    </div>
  );
};

export default Todo;
