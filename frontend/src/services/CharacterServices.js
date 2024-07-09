export const FetchingCharacters=async ()=>{
    const response = await fetch('http://127.0.0.1:5000/api/CharactersList',{
        method:'GET',
    })
   if(!response.ok){
    console.log("not able to fetch the characters")
   }
   const data = await response.json()
   return data
}
