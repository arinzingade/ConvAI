import React from 'react';
import { Link } from 'react-router-dom';


function App() {
  return (
    <>
    <div className='w-full flex justify-between p-5'>
      <div>
        convAI
      </div>
      <div className='flex gap-10'>
      <div >
       <Link to='/signUp'> sign up</Link>
         </div>
      <div>
        <Link to='/login'>login</Link>
      </div>
      </div>
    
    </div>
    </>
  );
}

export default App;