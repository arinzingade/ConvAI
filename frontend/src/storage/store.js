import {create} from 'zustand'

const useStore=create((set)=>({
    tokenVerified:false,
    setTokenVerified:(tokenVerified)=>set({tokenVerified})
}))
export default useStore