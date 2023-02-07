import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'
import { useLocation } from 'react-router-dom';


function Navbar() { 
  let navigate = useNavigate()
  const handleLogout = () =>{
    localStorage.removeItem('token')
    navigate("/login")
  }
  let location = useLocation();

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Notely</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon">   
    <i class="fas fa-bars" style={{color:"#CFF5E7", fontSize:"28px"}}></i>
    </span>
      

    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className={`nav-link-${location.pathname === '/'?"active":""}` }aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link-${location.pathname === '/about'?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('token')?<form class="d-flex " style={{marginLeft:'auto'}}>
        <Link class="btn btn-outline mx-3" role="button" to="/login">Login</Link>
        <Link class="btn btn-outline mr-3" role="button" to="/signup">Signup</Link>
      </form> : 
      <form class="d-flex " style={{marginLeft:'auto'}}>
      
      <button class="btn btn-outline mr-3"  onClick = {handleLogout} >Logout</button>
      </form> }
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar