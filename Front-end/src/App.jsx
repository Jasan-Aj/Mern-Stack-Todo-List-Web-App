import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Form from './components/Form'
import Todo from './components/Todo';

const App = () => {
  
  const [todoes, setTodoes] = useState([]);
  const [success, setSucess] = useState("");
  const [error, setError] = useState("");
  const [showOption, setshowOption] = useState(false);
  const baseUrl = "http://localhost:3000/";

  useEffect(() => {
    fetchTodos();
  }, []);

  const changeShowOption = ()=>{
    setshowOption(!showOption);
  }

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
      
      
      <div className="flex flex-col lg:flex-row ">
      
        <div className="lg:w-2/5 xl:w-1/3 p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-300 bg-blue-50">
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <Form addTodo={addnewtodo}/>
            </div>
          </div>
        </div>
        
        
        <div className="lg:w-3/5 xl:w-2/3 p-4 sm:p-6 lg:p-8 ">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-800">
                My Todos
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                {showOption ? "Showing Completed Todos" : "Showing Pending Todos"}
              </p>
            </div>
            
            {todoes.length > 0 && (
              <button 
                onClick={()=> changeShowOption()} 
                className="mt-3 sm:mt-0 text-blue-700 font-semibold cursor-pointer px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors duration-200"
              >
                {showOption ? "Pending Todos" : "Completed Todos"}
              </button>
            )}
          </div>
          
          <div className="overflow-y-auto pr-2 max-h-[calc(100vh-12rem)]">
            {todoes.length > 0 ? (
              <Todo 
                todoes={todoes} 
                showOption={showOption} 
                deleteTodo={deleteTodo} 
                updateStatus={updateStatus} 
              />
            ) : (
              <div className="text-gray-500 text-center py-10">
                No todos yet. Add your first Todo!
              </div>
            )}
          </div>
        </div>
      </div>
      
      
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-lg shadow-lg z-50 max-w-xs sm:max-w-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg shadow-lg z-50 max-w-xs sm:max-w-sm">
          {success}
        </div>
      )}
    </div>
  )
}

export default App