import React, { useState } from 'react'
import '../styles/Login.css'
import logo from '../assets/logo.png'
function Login({setAuth}) {

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState(false)

  function handleChange(e) {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(false)
    console.log(data);
    if (data.email === process.env.REACT_APP_EMAIL && data.password === process.env.REACT_APP_PASSWORD) {
        setAuth(true)
    } else {
      setError(true)
    }
  }


  return (
    <div className='login-background'>
      <div className="login-container">
        <div className="container">
          <img src={logo} alt="logo" height={80} width={170} />
          <div className='form-container'>
            <p id='admin-text'>Welcome Admin</p>
            <form onSubmit={handleSubmit}>
              <div className='input-container'>
                <label>Email</label>
                <input type="text" name="email" value={data.email} onChange={handleChange} required />
              </div>
              <div className='input-container'>
                <label>Password</label>
                <input type="text" name="password" value={data.password} onChange={handleChange} required />
              </div>
              <div className='button-container'>
            <button className='login-btn'>Admin Login</button>
            <button className='login-btn'>Employee Login</button>
          </div>
            </form>
            {error && <p id='err-text'>Something wrong occurred! Try Again</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
