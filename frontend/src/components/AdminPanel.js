import React, { useState } from 'react'
import {ApiRequest} from '../services/ApiRequest'

const AdminPanel = () => {
    const [numberOfFields,setNumberOfFields]=useState(0)
    const [fields,setFields]=useState([])

    const [submitted , SetSubmitted]=useState(false)
    const [name,setName]=useState('')
    const [files,setFiles]=useState({}) // object having files and filename
    
   function handleSubmit(e){
    e.preventDefault()
    displayInputFields(numberOfFields) 
    SetSubmitted(true)
   }
   function handleFileChange(e,index){
    const newFiles = {...files,
        [index]:{
            files:e.target.files[0]
        }}
    setFiles(newFiles)
   }
  
    const  handleFormSubmit = async (e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('characterName',name)
    Object.keys(files).forEach((key)=>{
        Array.from(files[key]).forEach((file)=>{
            formData.append('files',files[key].file)
            formData.append('fileNames', files[key].file.name);
        })
    })
    console.log(files)
    try{
        const response = await ApiRequest('/api/uploadFiles',{
            method:'POST',
            body:formData
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          console.log('Character created:', result);

    }catch(err){
        console.error('Error creating character:', err);
    }
   }
   function displayInputFields(n){
    const newField = Array(parseInt(n)).fill('')
    setFields(newField);
   }
  return (
    <div className='w-screen h-screen flex justify-center items-center gap-20'>
        <div>
            <form className='flex flex-col gap-10  ' onSubmit={submitted ? handleFormSubmit : handleSubmit}>
              
                {submitted ? <>
                    <input type='text' placeholder='name of the character'
                    className='border-2 border-black p-2'
                    onChange={(e)=>setName(e.target.value)}
                    ></input>
                {fields.map((element,index)=>{
                    return (
                        <div className='flex justify-center gap-10'>
                         <input key={index} type='file' placeholder='add the doc' 
                         onChange={(e)=>handleFileChange(e,index)}
                         >
                        </input>
                        
                        </div>
                    )
                })}
                 <div>   
                  <button className='border-2 border-black p-2 ' type='submit'>Add new character </button>
                </div>
                </>:
                <>
                 <input type='number' 
                
                 onChange={(e)=>setNumberOfFields(e.target.value)}
                 className='border-2 border-black focus:outline-none px-10 py-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' 
                 placeholder='Enter the number of fields'  ></input>
                 <button className='border-2 py-1 border-gray-700'onClick={handleSubmit}>Submit</button>
                </>
                
                }
           
            </form>
        </div>
       
    </div>
  )
}

export default AdminPanel