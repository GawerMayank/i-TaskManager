import { useState, useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])
  

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveToLS()
  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="container bg-blue-200 min-h-[60vh] w-1/2 my-24 mx-auto rounded-md">
        <h2 className='font-bold text-center p-2 text-3xl'>Welcome to i-TaskManager</h2>
        <h2 className='font-bold text-center text-xl'>(Manage all your tasks in one place)</h2>
        <div className="addToDo p-5">
          <h2 className='font-bold'>Add a ToDo</h2>
          <input onChange={handleChange} value={todo} type="text" placeholder='type at least 3 characters'  className='w-1/2 my-2' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-blue-950 text-white mx-2 rounded-md w-14 hover:font-bold'>Add</button>
        </div>
        <div className="yourToDo m-5">
          <h2 className='font-bold '>Your ToDos</h2>
          {todos.length === 0 && <div className='font-bold text-center my-10 text-3xl transition-all'>No ToDos to display</div>}
          {todos.map(item => {
            return <div key={item.id} className="text flex justify-between my-2">
              <div className='flex justify-center items-center gap-2'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted} />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="button flex h-1/2 items-center">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-blue-950 text-white mx-2 rounded-md w-6 p-1 hover:font-bold'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-blue-950 text-white mx-2 rounded-md w-6 p-1 hover:font-bold'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
