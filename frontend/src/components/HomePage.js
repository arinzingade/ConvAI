import React from 'react'
import Navbar from './Navbar'
import useStore from '../storage/store'

export const HomePage = () => {
    const tokenVerified =useStore((state)=>state.tokenVerified)
  return (
    <>
        <Navbar></Navbar>
        {tokenVerified ? 
  ( <div>
    you are logged in
    </div>):
       (
        <div className='w-full mt-20 text-4xl flex justify-center items-center'>
        <p>It looks like you are 
            <span className='text-red-500'> Not Logged</span> in</p>
        </div>
       )
       }
    </>
  )
}
