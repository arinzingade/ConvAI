import React from 'react'
import { useNavigate } from 'react-router-dom'

export const AdminChoice = () => {
    const navigate = useNavigate()
    function handleSubmit(){
        navigate('/adminPanel')
    }
  return (
  <div className='w-screen h-screen'>
    <div className='h-1/2 flex justify-center items-center gap-20'>
        <button className='border  px-10 py-2 border-black' onClick={handleSubmit}>create New character</button>
        <button className='border  px-10 py-2 border-black'>Update  character</button>
    </div>
  </div>
  )
}
