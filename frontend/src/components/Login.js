import React from 'react'
import { useState } from 'react'
const Login = () => {
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
  return (
    <div className='flex flex-col w-full h-screen justify-center items-center  '>
        <div className='border-2 border-black p-5 flex flex-col gap-10'>
        <h1>Login</h1>
        <form className='flex flex-col gap-5'>
        <input type='text' placeholder='username' onChange={(e)=>setUsername(e.target.value)} className='border-2 border-black p-3'></input>
        <input type='email' placeholder='email' onChange={(e)=>setEmail(e.target.value)} className='border-2 border-black p-3'></input>
        <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)} className='border-2 border-black p-3'></input>
        
        </form>
        </div>
        
       
    </div>
  )
}

export default Login