import React from 'react'

const DebateRoom = () => {
  return (
    <div className='w-screen h-screen bg-slate-100 flex'>
        <div className='w-1/4 h-full bg-white shadow-lg '></div>
        <div className='w-3/4 h-full flex justify-center items-end'>
            <div className='w-3/4  sticky bottom-10 '>
                <input type='text' className='w-full shadow-2xl  rounded-2xl  py-10 '></input>
            </div>
        </div>
    </div>
  )
}

export default DebateRoom