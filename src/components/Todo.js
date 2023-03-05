import { useState } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

const Todo = () => {
  const initialState = [
    {
      task: 'test',
      isCompleted: false,
    }
  ];
  
  const [todos, setTodos] = useState(initialState);
  console.log(todos);
  return (
    <div>
      <h1>ToDo List</h1>
      <AddTodo todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default Todo;
