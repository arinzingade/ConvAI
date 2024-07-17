import useStore from "../storage/store"
import { ApiRequest } from './ApiRequest'

export const CheckVerification = async ()=>{
    try{
        const response = await ApiRequest('/api/protected',{
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
export const LogoutUser= async ()=>{
    const setTokenVerified = useStore.getState().setTokenVerified
    const setUsername =  useStore.getState().setUsername
    try{
      const response= await ApiRequest('/api/logout',{
            method:'POST',
            credentials:'include'
        })
        if(response.status===200){
            setTokenVerified(false)    
              setUsername('')
              console.log('reaching logoutUser')
        }
    }
    catch(error){
        console.log(error)
    }
}