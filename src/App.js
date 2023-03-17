import React, {useState, useEffect} from 'react';
import TodoContainer from './components/TodoContainer'
import Header from './components/Header'
import './App.css'
import {
  BrowserRouter,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  const [changed, setChanged] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [displayTodo, setDisplayTodo] = useState([]);
  const [choosedCategory, setChoosedCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const headers = { 'Authorization': `Bearer key8F755Jwq70sIFN` }
    Promise.all([
      fetch(`https://api.airtable.com/v0/appEDxHmSRr4L82Fs/Todos`, { headers }),
      fetch(`https://api.airtable.com/v0/appEDxHmSRr4L82Fs/Categories`, { headers })
    ])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([result1, result2]) => {
      setTodoList(result1.records);
      setDisplayTodo(result1.records);
      setCategoryList(result2.records);
      setIsLoading(false);
    });
  }, [changed])

  const addTodo = (newTodoTitle, date) => {
    const newtodo = {
      "records": [
        {
          "fields": {
            "Categories": [
              choosedCategory, // include choosed Category
              categoryList[0].id // want always include All Category
           ],
            "Title": newTodoTitle,
            "Date": date.toISOString().substring(0, 10)
          },
        },
      ]
    }
    // console.log(newtodo)

    fetch(`https://api.airtable.com/v0/appEDxHmSRr4L82Fs/Todos`,
    { method: 'POST',
    body: JSON.stringify(newtodo),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer key8F755Jwq70sIFN`
    }
    }).then(res => res.json())
      .then(res =>setChanged(res));
  }

  function removeTodo(id) {
    fetch(`https://api.airtable.com/v0/appEDxHmSRr4L82Fs/Todos/${id}`,
    { method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer key8F755Jwq70sIFN`
    }
    }).then(res => res.json())
      .then(res =>setChanged(res));
  }

  const chooseCategory = (index, id) => {
    setChoosedCategory(id);
  }

  const filterByCategory  = (todos) => {
    var array = [];
    todos.forEach( (todoId) => {
      var temp = todoList.filter((todo) => todo.id === todoId)
      array.push(temp[0])
    })
    return array
  }

  return (
    <BrowserRouter>
      <Header categories={categoryList} chooseCategory={chooseCategory}/>
      <Route exact path="/">
        <TodoContainer
          addTodo={addTodo}
          displayTodo={displayTodo}
          removeTodo={removeTodo}
          isLoading={isLoading}
          root='/'
        />
      </Route>
      {categoryList.map((category)=>(
        <Route key={category.id} path={`/${category.fields.Name}`}>
          {category.fields.Name === "All" ? <Redirect to="/" /> :
          <>
          <div className='category-name'>{category.fields.Name}</div>
          <TodoContainer
            addTodo={addTodo}
            displayTodo={filterByCategory(category.fields.Todos)}
            removeTodo={removeTodo}
            isLoading={isLoading}
          />
          </> }
        </Route>
      ))}
    </BrowserRouter>
  )
}

export default App;
