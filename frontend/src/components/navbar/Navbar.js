import React, { useState } from 'react'
import {Link, useLocation} from "react-router-dom"

import { useAuthContext } from '../../hooks/useAuthContext'

import { useLogout } from '../../hooks/useLogout'
import { useTravelLogContext } from '../../hooks/useTravelLogContext'

const Navbar = ({isAdmin}) => {

  const location = useLocation();


  const {dispatch} = useTravelLogContext()
  
  const {logout} = useLogout()
  const {user} = useAuthContext()


  const[searchTerm, setSearchTerm] = useState("")

   
  const handleLogout = () => {
    logout()
  }

  const submitSearch = async(e) => {
    e.preventDefault()

    const response = await fetch(`/api/travelLogs/searched?searchTerm=${searchTerm}`, {
      method:"GET",
      headers:{
        'Authorization':`${user.email} ${user.token}`
      }
    })
    const json = await response.json()

    if(response.ok){
      dispatch({type:"SET_TRAVELLOGS", payload:json})
      setSearchTerm("")
    }
  }



  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      {/* brand */}
      <Link to = "/" className='navbar-brand' style={{marginLeft:"1em"}}>TraveLog</Link>

      {/* Search bar */}
      {location.pathname === "/" && user && (
        <form onSubmit={submitSearch}>
        <input 
          type="text"
          onChange={e => {setSearchTerm(e.target.value)}} 
          value={searchTerm}
        />
        <button>SEARCH</button>
      </form>
      )}


      {/* toggle button */}
      <button className='navbar-toggler' data-toggle="collapse" data-target="#menu">
        <span className='navbar-toggler-icon'></span>
      </button>

      {/* links */}
      <div  style={{display:"flex", justifyContent:"flex-end"}} className="collapse navbar-collapse" id='menu'>
        <ul className="navbar-nav">
          <li className="nav-item"><Link to="/" className='nav-link'>Home</Link></li>

        
          {!user && (
            <>
              <li className="nav-item"><Link to="/login" className='nav-link'>Login</Link></li>
              <li className="nav-item"><Link to="/signup" className='nav-link'>Signup</Link></li>
            </>
          )}
          {user && (
            <>
              {user && isAdmin && <li className="nav-item"><Link to="/admin" className='nav-link'>Admin</Link></li>}
              <li className="nav-item"><Link to="/profile" className='nav-link'>Profile</Link></li>
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
