
export const CheckVerification = async ()=>{
    try{
        const response = await fetch('/api/protected',{
            method:'GET',
            credentials:'include'
        })
        if(response.status===200){
            return true
        }else{
            return false 
        }
    }catch(error){
      console.log('error verifying the token')
    }
   
}