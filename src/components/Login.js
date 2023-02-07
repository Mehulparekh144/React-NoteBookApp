import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {
    let navigate = useNavigate()
    const host = "http://localhost:5000"
    const [cred, setCred] = useState({ email: "", password: "" })



    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        });
        const json = await response.json()
        if (json.success) {
            console.log(json.authToken)
            localStorage.setItem('token', json.authToken)
            props.showAlert("Successfully Logged in " , "success")
            navigate("/")

        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })

    }
    return (
        <div className='container sm my-4'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" value={cred.email} id="email" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={cred.password} className="form-control" name="password" id="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn" >Login</button>
            </form>

        </div>
    )
}

export default Login