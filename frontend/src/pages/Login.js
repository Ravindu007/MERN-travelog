import React, { useState } from 'react'

import "./signup.scss"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = () => {
    console.log(email, password);
  }

  return (
    <div className="signup">
      <form className='signupForm' onSubmit={handleSubmit}>
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

        <button className='btn btn-outline-primary mt-2'>Login</button>
      </form>
    </div>
  )
}

export default Login