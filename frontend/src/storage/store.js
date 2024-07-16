import {create} from 'zustand'

const useStore=create((set)=>({
    tokenVerified:false,
    setTokenVerified:(tokenVerified)=>set({tokenVerified}),
    serverDown:false,
    setServerDown:(serverDown)=>set({serverDown}),
    username:'',
    setUsername:(username)=>set({username})
}))
export default useStore