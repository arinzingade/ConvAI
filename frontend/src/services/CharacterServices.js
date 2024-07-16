

export const FetchingCharacters=async ()=>{
    const response = await fetch('/api/CharactersList',{
        method:'GET',
    })
   if(!response.ok){
    console.log("not able to fetch the characters")
   }
   const data = await response.json()
   return data
}
