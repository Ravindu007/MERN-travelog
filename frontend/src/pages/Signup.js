import React, { useState } from 'react'

//hooks
import { useSignup } from '../hooks/useSignup'

import "./signup.scss"

const Signup = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async(e) => {
    e.preventDefault()
    await signup(email, password)

    //reset fields
    setEmail("")
    setPassword("")
  }

  return (
    <div className="signup">
      <form className='signupForm' onSubmit={handleSubmit}>
        <h2>SIGNUP</h2>
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
        <button disabled={isLoading} className='btn btn-outline-secondary mt-2'>Signup</button>
      </form>
    </div>
  )
}

export default Signup