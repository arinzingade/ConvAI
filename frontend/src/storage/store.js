import {create} from 'zustand'

const useStore=create((set)=>({
    tokenVerified:false,
    setTokenVerified:(tokenVerified)=>set({tokenVerified}),
    serverDown:false,
    setServerDown:(serverDown)=>set({serverDown})
}))
export default useStore