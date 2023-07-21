import React from 'react';

import './Todo.css'


const Todo = ({ todo, onStatusChange, onDelete, onEdit }) => {
  const statusOptions = [
    { value: 'not-completed', label: 'Not Completed' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="todo-card">
      <div className="todo-content">
        <h3>{todo.name}</h3>
        <p>{todo.description}</p>
      </div>
      
      <div className="todo-actions">
        <button onClick={() => onEdit(todo.id)} className="edit-button">
          Edit
        </button>
        <button onClick={() => onDelete(todo.id)} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;