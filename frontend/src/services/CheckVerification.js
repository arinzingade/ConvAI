import { ApiRequest } from "./ApiRequest"

export const CheckVerification = async ()=>{
    try{
        const response = await ApiRequest('http://127.0.0.1:5000/api/protected',{
            method:'GET',
            credentials:'include'
        })
        if(response.status===200){
            const data = await response.json()
            // since the response is in json parse it . 
            return {
                tokenBoolean:true,
                username:data.username
            }
        }else{
            return {
                tokenBoolean:false,
                username:''
            }
        }
    }catch(error){
      console.log('error verifying the token')
    }
   
}