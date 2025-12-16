import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Form from './components/Form'
import Todo from './components/Todo';

const App = () => {
  
  const [todoes, setTodoes] = useState([]);
  const [success, setSucess] = useState("");
  const [error, setError] = useState("");
  const baseUrl = "http://localhost:3000/";

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSucess = (msg)=>{
    setSucess(msg);
    setTimeout(()=>{
      setSucess("")
    },3000);
  }

  const handleError = (msg)=>{
    setError(msg);
    setTimeout(()=>{
      setError("")
    },3000);
  }

  const fetchTodos = async()=>{
    try{
      const response = await fetch(baseUrl + "myTodoes");
      const fetchedTodos = await response.json();
      if(response.ok){
        setTodoes(fetchedTodos);
      }
      else{
        throw new Error("");
      }
      
    }catch(err){
      handleError("Failed to fetch todoes");
    }
  }

  const addnewtodo = async (title, description)=>{
    const newtodo = {title,description};
    try{
      const response = await fetch(baseUrl + "myTodoes",{
        method: 'POST',
        headers: {
          'Content-Type' :'application/json'
        },
        body: JSON.stringify(newtodo)
      });
      if(response.ok){
        fetchTodos();
        handleSucess("Sucessfully added!");
      }else{
        throw new Error("");
      }
    }catch(err){
      handleError("Failed to add new todo");
    }
  }

  const deleteTodo = async(id)=>{
    try{
      const response = await fetch(baseUrl + "myTodoes/" + id,{
        method: 'DELETE',
        headers: {
          'Content-Type' : 'application/json'
        }
      });

      if(response.ok){
        handleSucess("sucessfully Deleted!");
        fetchTodos();    
      }
      else{
        throw new Error("Delete failed");
      }
    }
    catch(err){
      handleError("Failed to Delete this todo");
    }
  }

  const updateStatus = async(id)=>{
    try{
      const response = await fetch(baseUrl + "myTodoes/updateStatus/" + id,{
        method: 'PATCH',
        headers: {'Content-Type' : 'application/json' },
      });

      if(response.ok){
        fetchTodos();
        handleSucess("Sucessfully updated!");
      }

    }catch(err){
      handleError("Failed to update this todo");
    }
  }

  return (
    <div>
      <Navbar/>
      <div className='grid grid-cols-2'>
        <div className='flex justify-center h-screen  border-r-2 border-gray-300'>
          <Form addTodo = {addnewtodo}/>
        </div>
        <div className='ml-5 mt-10'>
          <div className='flex justify-between pb-5 mr-40'>
            <p className='font-bold text-xl '>My Todoes</p>
            {todoes.length > 0 && <button className='text-green-700 font-semibold'>Completed Todoes</button>}
          </div>
          {success && <p>{success}</p>}
          
          {todoes.length > 0 ? (
            <Todo todoes={todoes} deleteTodo={deleteTodo} updateStatus={updateStatus} />
          ) : (
            <div className="text-gray-500 text-center py-10">No todos yet. Add your first Todo!</div>)}
        </div>
        {error && <p className='translate-y-145 translate-x-310 fixed transition-all duration-500 ease-in-out bg-gray-200
         border-r-5 shadow font-semibold text-red-700 shadow-gray-600 w-max px-8 py-4 rounded-lg'>{error}</p>}

        {success && <p className='translate-y-145 translate-x-310 fixed transition-all duration-500 ease-in-out bg-gray-200 
        border-r-5 shadow font-semibold text-green-700 shadow-gray-600 w-max px-8 py-4 rounded-lg'>{success}</p>}
      </div>
     
    </div>
  )
}

export default App