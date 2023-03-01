import React from 'react';

function Todo({ id, title, completed, handleDelete, handleUpdate }) {
  const handleCheckboxChange = () => {
    handleUpdate({ id, title, completed: !completed });
  };

  const handleDeleteClick = () => {
    handleDelete(id);
  };

  return (
    <div>
      <input type="checkbox" checked={completed} onChange={handleCheckboxChange} />
      {title}
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}

export default Todo;