import React, { useState } from 'react'

const Form = ({addTodo}) => {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");

  return (
    <div>
      <form className='bg-blue-100  p-5 rounded-lg shadow-lg' onSubmit={(e)=> {
        e.preventDefault();
        addTodo(title, description);
      }}>
          <div>
            <label>ToDo: </label>
            <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} className='bg-gray-100 border border-gray-400 rounded' />
          </div>
          <div className='mt-5'>
            <label>Description: </label>
            <input type="text" value={description} onChange={(e)=> setdescription(e.target.value)} className='bg-gray-100 border border-gray-400 rounded' />
          </div>
          <button type="submit" className='bg-red-400 text-white mt-6 px-3 rounded font-semibold py-1'>Add</button>
      </form>
    </div>
  )
}

export default Form