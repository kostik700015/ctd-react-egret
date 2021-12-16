import React from 'react'
import { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import Calendar from 'react-calendar';
import PropTypes from 'prop-types';

const AddTodoForm = (props) => {
  const[todoTitle, setTodoTitle] = useState('');
  const [value, onChange] = useState(new Date());
  const[popOut, setPopOut] = useState(false);

  const handleDate = (event) => {
    onChange(event)
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    props.onAddTodo(todoTitle, value)
    setTodoTitle('');
  }

  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }; 
  
  const handleCalendar = () => {
    setPopOut(!popOut)
  }

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        <div className="input-group">
        <InputWithLabel 
          todoTitle={todoTitle} 
          handleTitleChange={handleTitleChange}
        />
        <button className="add-button" onClick={handleCalendar}>Calendar</button>
        <button type="submit" className="add-button">Add Todo</button>
        </div>
        { popOut ?
        <Calendar
          onChange={handleDate}
          value={value}
          className="react-calendar"
        />
        : <div></div>}
      </form>
    </div>
  )
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func
};

export default AddTodoForm