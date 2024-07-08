import React from 'react'
import Navbar from './Navbar'
import useStore from '../storage/store'

export const HomePage = () => {
    const tokenVerified =useStore()
  return (
    <>
        <Navbar></Navbar>
        {tokenVerified ? 
        <div>
            you are logged in
        </div>:
        <div className='w-full h-full flex justify-center items-center'>
            <p>It looks like you are not logged in</p>
            </div>}
    </>
  )
}
