import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='py-6 px-2 flex justify-between text-lg shadow-md '>
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