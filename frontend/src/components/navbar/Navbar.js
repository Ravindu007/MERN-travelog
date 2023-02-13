import React from 'react'
import {Link} from "react-router-dom"

const Navbar = () => {
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
          <li className="nav-item"><Link to="/login" className='nav-link'>Login</Link></li>
          <li className="nav-item"><Link to="/signup" className='nav-link'>Signup</Link></li>
          <li className="nav-item"><Link to="/" className='nav-link'>Logout</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
