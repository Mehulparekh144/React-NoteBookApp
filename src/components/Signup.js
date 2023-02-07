import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup(props) {
  const navigate = useNavigate()
  const host = "http://localhost:5000"
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, } = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    if (json.success) {
      localStorage.setItem('token', json.authToken)
      navigate("/")
      props.showAlert("Account Created Successfully ", "success")
    }
    
    else {
    props.showAlert("Invalid details", "danger")

  }
}

const onChange = (e) => {
  setCredentials({ ...credentials, [e.target.name]: e.target.value })

}
return (
  <div className="container sm my-4">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" name="name" value={credentials.name} className="form-control" id="name" onChange={onChange} minLength={3} required />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" name="email" value={credentials.email} className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} required />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" name="password" value={credentials.password} className="form-control" id="password" minLength={8} onChange={onChange} required />


      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" value={credentials.cpassword} className="form-label">Confirm Password</label>
        <input type="password" name="cpassword" className="form-control" id="cpassword" onChange={onChange} minLength={8} required />
      </div>

      <button type="submit" className="btn btn-primary">Signup</button>
    </form>
  </div>

)
}

export default Signup