// src/App.js
import React, { useState } from 'react';
import Todo from './component/Todo/Todo';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: uuidv4(),
      name: 'Create a Todo App',
      description: 'Build a Todo app with React.',
      status: 'not-completed',
    },
   
  ]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all');
  const [editTodoId, setEditTodoId] = useState(null);

  const addTodo = () => {
    if (!name || !description) {
      alert('Please provide a task name and description.');
      return;
    }

    const newTodo = {
      id: uuidv4(),
      name: name,
      description: description,
      status: 'not-completed',
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setName('');
    setDescription('');
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const updateStatus = (id, status) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, status: status } : todo))
    );
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setName(todoToEdit.name);
      setDescription(todoToEdit.description);
      setEditTodoId(id);
    }
  };

  const saveEditedTodo = () => {
    if (!name || !description) {
      alert('Please provide a task name and description.');
      return;
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === editTodoId ? { ...todo, name: name, description: description } : todo
      )
    );

    setName('');
    setDescription('');
    setEditTodoId(null);
  };

  const cancelEdit = () => {
    setName('');
    setDescription('');
    setEditTodoId(null);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.status === 'completed';
    if (filter === 'not-completed') return todo.status === 'not-completed';
    return true;
  });

  return (
    <div className="App">
      <h1>MY Todo</h1>
      <div className="add-todo-form">
        <input
          type="text"
          placeholder="Todo Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Todo Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {editTodoId ? (
          <div>
            <button onClick={saveEditedTodo}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        ) : (
          <button onClick={addTodo}>Add Todo</button>
        )}
      </div>
      <div className="todo-filter">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not-completed">Not Completed</option>
        </select>
      </div>
      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onStatusChange={updateStatus}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default App;