import React from 'react'

const DebateRoom = () => {
  return (
    <div className='w-screen h-screen bg-slate-200 flex'>
        <div className='w-1/4 h-full bg-white shadow-lg shadow-black'></div>
        <div className='w-3/4 h-full flex justify-center items-end'>
            <div className='w-3/4  sticky bottom-10 '>
                <input type='text' className='w-full shadow-2xl shadow-black rounded-2xl  py-10 '></input>
            </div>
        </div>
    </div>
  )
}

export default DebateRoom