import React, { useEffect, useState } from 'react'
import { FetchingCharacters } from '../services/CharacterServices'
const CharacterList = () => {
  const [list,setList]=useState([])
  useEffect(()=>{
   async function fetchList(){
      const response = await FetchingCharacters()
      setList(response)
    }
    fetchList()
  })
  return (
    <div>
        {list.map((element)=>{
          return(
            <>
              {element}
            </>
          )
        })}
    </div>
  )
}

export default CharacterList