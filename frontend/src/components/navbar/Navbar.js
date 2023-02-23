import React from 'react'
import {Link} from "react-router-dom"

import { useAuthContext } from '../../hooks/useAuthContext'

import { useLogout } from '../../hooks/useLogout'

const Navbar = () => {
  const {logout} = useLogout()
  const {user} = useAuthContext()
   
  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      {/* brand */}
      <Link to = "/" className='navbar-brand' style={{marginLeft:"1em"}}>TraveLog</Link>

      {/* toggle button */}
      <button className='navbar-toggler' data-toggle="collapse" data-target="#menu">
        <span className='navbar-toggler-icon'></span>
      </button>

      {/* links */}
      <div  style={{display:"flex", justifyContent:"flex-end"}} className="collapse navbar-collapse" id='menu'>
        <ul className="navbar-nav">
          <li className="nav-item"><Link to="/" className='nav-link'>Home</Link></li>
          <li className="nav-item"><Link to="/profile" className='nav-link'>Profile</Link></li>
          {!user && (
            <>
              <li className="nav-item"><Link to="/login" className='nav-link'>Login</Link></li>
              <li className="nav-item"><Link to="/signup" className='nav-link'>Signup</Link></li>
            </>
          )}
          {user && (
            <>
              <span className='nav-link' >{user.email}</span>
              <li className="nav-item"><Link onClick={handleLogout} className='nav-link'>Logout</Link></li>  
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
