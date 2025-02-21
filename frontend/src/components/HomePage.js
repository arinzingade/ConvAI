import React from 'react'
import Navbar from './Navbar'
import useStore from '../storage/store'
import image from '../images/loggedOutBackground.jpg'

export const HomePage = () => {
    const tokenVerified =useStore((state)=>state.tokenVerified)
  return (
    <>
    <div className='w-screen h-screen'>
    <Navbar></Navbar>
        {tokenVerified ? 
  ( <div className='h-1/2 text-4xl flex justify-center items-center'>
    You are logged in
    {/* <CharactersList></CharactersList> */}
    </div>):
       (
        <div className='w-full h-3/4 text-4xl flex flex-col justify-center items-center text-[#6C757D] '>
        <p>Login to view various characters and
          <span className='text-5xl text-blue-400'> Interact</span>  </p>
          <div  className='w-full flex justify-center'>
            <img src={image} className='max-h-72 object-contain'
            alt = "A Dog"></img>
          </div>
        </div>
       )
       }
    </div>
    
    </>
  )
}
