import useStore from "../storage/store"

export const ApiRequest= async (endpoint,options={})=>{
    const setServerDown = useStore.getState().setServerDown
    try{
        const timeOut = 20000
        const controller = new AbortController()
        const timeOutId = setTimeout(()=>controller.abort(),timeOut)
        const response = await fetch(endpoint,{
            ...options,signal:controller.signal
        })
        clearTimeout(timeOutId)
        setServerDown(false)
        return response
    }catch(error){
        setServerDown(true)
     
        return error
    }
}