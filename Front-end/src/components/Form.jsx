import React, { useState } from 'react'

const Form = ({addTodo}) => {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");

  return (
    <div>
      <form className='bg-blue-100 mt-10 sm:mt-20 flex flex-col  gap-5 p-5 rounded-lg shadow-lg' onSubmit={(e)=> {
        e.preventDefault();
        addTodo(title, description);
        setTitle("");
        setdescription("");
      }}>
        <div className='flex flex-col gap-4'>
          <input type="text" placeholder='  Title' value={title} onChange={(e)=> setTitle(e.target.value)} className='bg-gray-100 border border-gray-400 rounded h-10' />
          <input type="text" placeholder='  Description' value={description} onChange={(e)=> setdescription(e.target.value)} className='bg-gray-100 border h-10 border-gray-400 rounded' />
        </div>
          
          <button type="submit" className='bg-gray-700 h-10 text-white cursor-pointer px-3 rounded font-semibold py-1'>Add</button>
      </form>
    </div>
  )
}

export default Form