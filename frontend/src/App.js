import React, { useEffect } from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from './components/Login';
import SignUp from './components/SignUp';
import { HomePage } from './components/HomePage';
import useStore from './storage/store';
import { CheckVerification } from './services/CheckVerification';
import ServerDownPopup from './components/ServerDownPopUp';
import DebateRoom from './components/DebateRoom';
import AdminPanel from './components/AdminPanel';
import CharacterList from './components/CharacterList';
import { AdminChoice } from './components/AdminChoice';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const serverDown = useStore((state)=>state.serverDown)
  const setServerDown=useStore((state)=>state.setServerDown)
  const setTokenVerified = useStore((state)=>state.setTokenVerified)
  const setUsername = useStore((state)=>state.setUsername)
  useEffect(()=>{
    async function Verification(){
      const response = await CheckVerification()
      setTokenVerified(response.tokenBoolean)
      setUsername(response.username)
    }
    Verification()
  },[setTokenVerified,setUsername])
  return (
    <>
     <BrowserRouter >
     <ServerDownPopup isVisible={serverDown} onclose={()=>setServerDown(false)} />
    <Routes>
    
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signUp' element={<SignUp/>}></Route>
      <Route path='/debateRoom' element={<DebateRoom/>}></Route>
      <Route path='/adminPanel' element={<AdminPanel/>}></Route>
      <Route path='/List' element={<CharacterList/>}></Route>
      <Route path='/choice' element={<AdminChoice/>}></Route>
      <Route path='/AdminDashboard' element={<AdminDashboard/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;