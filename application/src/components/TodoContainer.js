import React from 'react'
import { useState } from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from'./TodoList'
import PropTypes from 'prop-types';

function TodoContainer({addTodo, displayTodo, removeTodo, isLoading, value, root}){
  // console.log(temp)
  
  return (
    <div className="todo">
      {root === '/' ? <div style={{marginTop: '40px'}}></div> : <AddTodoForm onAddTodo={addTodo} value={value}/>}
      {isLoading ? <span>Loading...</span> : <TodoList todoList={displayTodo} onRemoveTodo={removeTodo}/>}
    </div>
  )
}

TodoContainer.propTypes = {

};

export default TodoContainer;