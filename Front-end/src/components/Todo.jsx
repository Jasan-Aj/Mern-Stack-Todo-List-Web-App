import React from 'react'

const Todo = ({todoes, deleteTodo, updateStatus, showOption}) => {
  return (
    <div>
        {
            (showOption == false ? (todoes.filter((todo)=> todo.status == false)) : (todoes.filter((todo)=> todo.status == true)))
            .map((todo)=>(
                
                <div key={todo._id} className='bg-cyan-100 shadow shadow-blue-500 border-r-6 rounded-lg p-4 w-3/4 border-blue-500 mt-4'>
                    <div className='flex'>
                        
                        <p className='font-semibold '>{todo.title}</p>
                    </div>
                    <div className='mt-1'>
                        <p className='text-sm'>{todo.description}</p>
                    </div>
                    <div className='flex gap-4 mt-4'>
                        <button className='bg-green-600 text-white px-3 py-1 rounded font-semibold cursor-pointer' onClick={()=> updateStatus(todo._id)}>{showOption ? "Pending" : "Done"}</button>
                        <button className='bg-red-600 text-white px-3 py-1 rounded font-semibold cursor-pointer' onClick={()=>deleteTodo(todo._id)}>Delete</button>
                    </div>
                </div> 
            ))
        }
        
    </div>
  )
}

export default Todo