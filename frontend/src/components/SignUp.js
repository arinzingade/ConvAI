import React, { useState } from 'react';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include'
      });

      if (response.ok) {
        alert('User created');
      } else {
        console.log('Not created');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col w-full h-screen justify-center items-center'>
      <div className='border-2 border-black p-5 flex flex-col gap-10'>
        <h1>SIGN UP</h1>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
          <input type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)} className='border-2 border-black p-3' />
          <input type='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} className='border-2 border-black p-3' />
          <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} className='border-2 border-black p-3' />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
