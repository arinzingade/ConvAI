import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='p-2 flex justify-between text-lg'>
        <p>ConvAI</p>
        <div className='w-1/6'>
            <ul className='flex justify-around '>
                <li><Link to='/login'>login</Link></li>
                <li><Link to='/signup'>signUp</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar