import React, { useState } from 'react'

const CharacterForm = () => {
    const [name,setName]=useState()
  async  function handleSubmit(e){
        e.preventDefault()
        try{
            const response = await fetch('/api/createChar',{
                method:'POST',
                body:name,
                credentials:'include'
            })
            if(response.ok){
                console.log('character Created')
            }
            
        }catch(err){
            console.log(Error)
        }
    }
  return (
    <div>
        <form className='flex flex-col gap-10 items-center m-10 '>
            <input type='text' placeholder='name of the character' onChange={(e)=>setName(e.target.value)} className='border-2 border-black px-5 py-2 focus:outline-none'></input>
            <button onClick={handleSubmit} className='border-2 border-black px-5 py-2 '>submit</button>
        </form>
    </div>
  )
}

export default CharacterForm