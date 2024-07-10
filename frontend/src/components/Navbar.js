import React from 'react'
import { Link } from 'react-router-dom'
import useStore from '../storage/store'
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const tokenVerified =useStore((state)=>state.tokenVerified)
  const username = useStore((state)=>state.username)
  return (
    <div className='p-2 flex justify-between items-center text-md shadow-md '>
        <p>ConvAI</p>
        {tokenVerified ?
         <div className='w-1/6 flex justify-around items-center'>
          <p>logout</p>
          <div className='flex flex-col items-center'>
          <CgProfile size={16}/>
          <p className='text-sm'>{username}</p>
          </div>
         </div>
         :
         <div className='w-1/6'>
         <ul className='flex justify-around '>
             <li><Link to='/login'>login</Link></li>
             <li><Link to='/signup'>signUp</Link></li>
             <div className='flex flex-col items-center'>
          <CgProfile size={16}/>
          <p className='text-sm'>Guest</p>
          </div>
         </ul>
     </div>
        }
       
    </div>
  )
}

export default Navbar