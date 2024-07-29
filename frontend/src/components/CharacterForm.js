import React, { useState } from 'react'

const CharacterForm = () => {
    const [name,setName]=useState()
  async  function handleSubmit(e){
        e.preventDefault()
        try{
            const response = await fetch('/createChar',{
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
        <form>
            <input type='text' placeholder='name of the character' onChange={(e)=>setName(e.target.value)}></input>
            <button onClick={handleSubmit}></button>
        </form>
    </div>
  )
}

export default CharacterForm