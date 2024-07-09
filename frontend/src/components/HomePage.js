import React from 'react'
import Navbar from './Navbar'
import useStore from '../storage/store'
import { CharactersList } from './CharactersList'
import image from '../images/loggedOutBackground.jpg'

export const HomePage = () => {
    const tokenVerified =useStore((state)=>state.tokenVerified)
  return (
    <>
        <Navbar></Navbar>
        {tokenVerified ? 
  ( <div>
    you are logged in
    <CharactersList></CharactersList>
    </div>):
       (
        <div className='w-full mt-20 text-4xl flex flex-col justify-center items-center text-[#6C757D]'>
        <p>Login to view various characters to
          <span className='text-4xl text-blue-400'> Interact</span>  </p>
          <div className='m-0'>
            <img src={image} className='max-h-full'></img>
          </div>
        </div>
       )
       }
    </>
  )
}
