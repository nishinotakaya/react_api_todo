import { useState } from 'react';

const AddTodo = ({ setTodos }) => {
  const [task, setTask] = useState('');

  const handleNewTask = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    const data = { task: task, isCompleted: false };
    event.preventDefault();
    if (task === '') return;

      setTodos((todos) => [...todos, { task, isCompleted: false }]);
      setTask('');
      fetch('http://localhost:4567/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
        setTodos((todos) => [...todos, data]);
        setTask('');
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      Add Task :
      <input value={task} placeholder="Add New Task" onChange={handleNewTask} />
    </form>
  );
};

export default AddTodo;
