import React, { useEffect, useState } from 'react'
import { FetchingCharacters } from '../services/CharacterServices'

export const CharactersList = () => {
    const [list,setList]=useState([])
    useEffect(()=>{
        const FetchData = async()=>{
            try{
                const data = await FetchingCharacters()
            setList(data)
            }catch(error){
                console.log('error setting the list for characters')
            }       
        }
        FetchData()
    },[])
  return (
    <div>
        {list.map((character)=>{
            return(
                <>
                    <p>{character.name}</p>
                    <p>{character.details}</p>
                </>
            )
        })}
    </div>
  )
}
