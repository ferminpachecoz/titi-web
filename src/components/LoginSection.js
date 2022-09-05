import React from 'react';
import './LoginSection.css';
import { useState } from 'react';

export default function LoginSection() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  const handleSubmit = e =>{
    e.preventDefault();

    let data ={
      email: email,
      password: password
    }

    let request = {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(data)
    }

    fetch('https://lm-serverless.herokuapp.com/users/create', request)
      .then(res => res.json())
      .then(data =>{
        if(data && data.email && data.password){
          sessionStorage.setItem("admin", true)
          window.location.replace('/')
        }else{
          setError('La contraseña y/o el email es incorrecto')
        }
      })
      .catch(err => console.error(err))
  }
  return (
    <div className='d-flex justify-content-center'>
      <div className='col-10 col-sm-8 col-md-6 col-lg-4'>
        <h1 className='text-center my-5'>ACCOUNT</h1>
        <h5 className='text-center sign-in-title'>SIGN IN</h5>
        <p className='font-lg fw-600 text-center mt-5'>WELCOME BACK</p>
        <p className='text-center font-sm'>Sign in with your email and password.</p>
        <form className='d-flex flex-column my-5' onSubmit={e => handleSubmit(e)} >
          <input type="text" placeholder='Email' className='mb-5' onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} />
          {error &&
            <p className='mt-3 error-message'>*{error}</p>
          }
          <a href='#' className='font-sm mt-3 forgot-button'>Forgot password ?</a>
          <div className='sign-in-button my-4'>
            <button type='submit'><a href="#" className='text-center'>SIGN IN</a></button>
          </div>
        </form>
      </div>
    </div>
  )
}
