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
    console.log("fetch todoes working")
  }, []);

  const handleSucess = ()=>{
    setSucess("sucess");
    setTimeout(()=>{
      setSucess("")
    },3000);
  }

  const handleError = ()=>{
    setError("failed");
  }

  const fetchTodos = async()=>{
    try{
      const response = await fetch(baseUrl + "myTodoes");
      const fetchedTodos = await response.json();
      if(response.ok){
        setTodoes(fetchedTodos);
        handleSucess();
      }
      else{
        throw new Error("failed fetch");
      }
      
    }catch(err){
      handleError();
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
        handleSucess();
      }else{
        throw new Error("Failed fetch");
      }
    }catch(err){
      handleError();
    }
  }

  const deleteTodo = async(id)=>{
    try{
      const response = await fetch(baseUrl + "myTodoes/" + id,{
        method: 'DELETE',
        header: {
          'Content-Type' : 'application/json'
        }
      });

      if(response.ok){
        handleSucess();
        fetchTodos();    
      }
    }
    catch(err){
      handleError();
    }
  }

  const updateStaus = async(id)=>{
    try{
      const response = await fetch(baseUrl + "myTodoes/updateStatus/" + id,{
        method: 'PATCH',
        headers: {'Content-Type' : 'application/json' },
      });

      if(response.ok){
        fetchTodos();
        handleSucess();
      }

    }catch(err){
      handleError();
    }
  }

  return (
    <div>
      <Navbar/>
      <div className='flex justify-center mt-20'>
        <Form addTodo = {addnewtodo}/>
      </div>
      <div className='ml-5 mt-10'>
        <div className='flex justify-center font-bold text-xl pb-5'>
          <p>My Todoes</p>
        </div>
        {success && <p>Sucessfully added</p>}
        {error && <p>There is an error</p>}
        <Todo todoes = {todoes} deleteTodo ={deleteTodo} updateStaus = {updateStaus}/>
      </div>
     
    </div>
  )
}

export default App