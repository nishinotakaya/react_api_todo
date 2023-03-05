import { useState } from 'react';

const AddTodo = ({ setTodos }) => {
  const [task, setTask] = useState('');

  const handleNewTask = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (task === '') return;

    const data = { task, isCompleted: false };

    fetch('http://localhost:4567/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        fetch('http://localhost:4567/todos')
          .then((response) => response.json())
          .then((data) => {
            setTodos(data);
            setTask('');
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error:', error);
          });
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
