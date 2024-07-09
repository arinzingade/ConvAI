import useStore from "../storage/store"

export const ApiRequest= async (endpoint,options={})=>{
    const setServerDown = useStore.getState().setServerDown
    try{
        const response = await fetch(endpoint,options)
        setServerDown(false)
        return response
    }catch(error){
        setServerDown(true)
        return error
    }
}