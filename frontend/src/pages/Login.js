import React, { useState } from 'react'

import {useLogin} from "../hooks/useLogin"

import "./signup.scss"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async(e) => {
    e.preventDefault()
    await login(email, password)

    //reset fields
    setEmail("")
    setPassword("")
  }

  return (
    <div className="signup">
      <form className='signupForm' onSubmit={handleSubmit}>
        <h2>LOGIN</h2>
        <div className="from-group">
          <label>Email</label>
          <input 
            type="email"
            onChange={e=>{setEmail(e.target.value)}} 
            value = {email}
            className="form-control"
          />
        </div>

        <div className="from-group">
          <label>Password</label>
          <input 
            type="text"
            onChange={e=>{setPassword(e.target.value)}} 
            value = {password}
            className="form-control"
          />
        </div>
        <div className="error">
          {error && (<small className='error'>{error}</small>)}
        </div>
        <button disabled={isLoading} className='btn btn-outline-secondary mt-2'>Login</button>
      </form>
    </div>
  )
}

export default Login