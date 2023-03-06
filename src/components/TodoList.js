import React from 'react';
import { useState, useEffect } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  console.log(todos);
  useEffect(() => {
    fetch('http://localhost:4567/todos')
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);
  function handleRemoveTask(index) {
    const id = todos[index].id;
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    
    fetch(`http://localhost:4567/todos/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        console.log('Task deleted successfully');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }  
  // 追加: チェックボックスが変更された時の処理
  const handleUpdateTask = (index, event) => {
    event.persist();
    const todo = todos[index];
    const id = todos[index].id;
    const updatedTodo = { ...todo, completed: !todo.completed };
    const newTodos = [...todos];
    newTodos[index] = updatedTodo;
    console.log(todo)
    console.log(updatedTodo)
  
    // PUTリクエストを送信
    fetch(`http://localhost:4567/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: updatedTodo.completed,
        title: updatedTodo.title
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }  
        // 更新が成功した場合にのみ React state を更新する
        setTodos(newTodos);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  
  return (
    <ul>
      {todos.map((todo, index) => (
        <li
          key={index}
          style={{
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(event) => handleUpdateTask(index, event)} // イベントを引数に追加
          />
          {todo.title}
          <span
            onClick={() => handleRemoveTask(index)}
            style={{ cursor: 'pointer' }}
          >
            X
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
