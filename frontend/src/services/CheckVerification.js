import { ApiRequest } from "./apiRequest"

export const CheckVerification = async ()=>{
    try{
        const response = await ApiRequest('http://127.0.0.1:5000/api/protected',{
            method:'GET',
            credentials:'include'
        })
        if(response.status===200){
            return true
        }else{
            return false 
        }
    }catch(error){
        alert('error verifying the token')
    }
   
}