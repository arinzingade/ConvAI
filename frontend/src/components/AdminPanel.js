import React, { useState } from 'react'

const AdminPanel = () => {
    const [numberOfFields,setNumberOfFields]=useState(0)
    const [fields,setFields]=useState([])
    const [submitted , SetSubmitted]=useState(false)
    
   function handleSubmit(e){
    e.preventDefault()
    displayInputFields(numberOfFields) 
    SetSubmitted(true)
    
   }
   function displayInputFields(n){
    const newField = Array(parseInt(n)).fill('')
    setFields(newField)
   
   }
  return (
    <div className='w-screen h-screen flex justify-center items-center gap-20'>
        <div>
            <form className='flex flex-col gap-10 '>
                {submitted ? <>
                {fields.map((element,index)=>{
                    
                    return (
                        <input key={index} type='file' placeholder='add the doc'>
                        </input>
                    )
                })}
                </>:
                <>
                 <input type='number' 
                 value={numberOfFields}
                 onChange={(e)=>setNumberOfFields(e.target.value)}
                 className='border-2 border-black focus:outline-none px-10 py-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' 
                 placeholder='Enter the number of fields'  ></input>
                 <button className='border-2 py-1 border-gray-700'onClick={handleSubmit}>Submit</button>
                </>
                
                }
           
            </form>
        </div>
        <div>
        
            <button className='border-2 border-black p-2'>Add new character </button>
        </div>
    </div>
  )
}

export default AdminPanel