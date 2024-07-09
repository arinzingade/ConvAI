import React, { useEffect } from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './components/Login';
import SignUp from './components/SignUp';
import { HomePage } from './components/HomePage';
import useStore from './storage/store';
import { CheckVerification } from './services/CheckVerification';
import ServerDownPopup from './components/ServerDownPopUp';
function App() {
  const serverDown = useStore((state)=>state.serverDown)
  const setServerDown=useStore((state)=>state.setServerDown)
  const setTokenVerified = useStore((state)=>state.setTokenVerified)
  useEffect(()=>{
    async function Verification(){
      const response = await CheckVerification()
      setTokenVerified(response)
    }
    Verification()
  },[setTokenVerified])
  return (
    <>
     <BrowserRouter >
     <ServerDownPopup isVisible={serverDown} onclose={()=>setServerDown(false)} />
    <Routes>
    
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signUp' element={<SignUp/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;