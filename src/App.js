import { useState , useRef, useEffect} from 'react';
import './App.css';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([]);
  const todoRef = useRef();

  useEffect( () =>{
    const localtodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(localtodos) setTodos(localtodos)
  }, [])

  useEffect( () =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo (){
    const toDoText = todoRef.current.value
    console.log(toDoText)
    setTodos(prevTodos => {
      return [...prevTodos,
        {
          id:uuidv4(),
          name: toDoText,
          completed: false,
        }
      ]
    })
    todoRef.current.value = null
  }

  function handleClear(){
    const newTodos = todos.filter(todo => !todo.completed)
    if(newTodos) setTodos(newTodos)
  }

  function toggleTodo(id){
    const newTodos = [... todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }

  return (
    <div>
      <TodoList todos={todos} toggleTodo ={toggleTodo}/>
      <input type="text" ref={todoRef}></input>
      <button onClick={handleAddTodo}>Add to list</button>
      <button onClick={handleClear}>Clear Completed</button>
      <div>{todos.filter(todo => !todo.completed).length} tasks left to complete</div>
    </div>
    
  );
}

export default App;
