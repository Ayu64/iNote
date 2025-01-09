import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login(props) {
  

  const [credentials, setcredentials] = useState({ email: "", password: "" })
  // const[password,setpass;word]=useState('')
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch('')
    const response = await fetch('http://localhost:27480/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    })
    const json = await response.json();
    // console.log(json)
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate('/')
      props.showAlert(" Login Successfully ", "success")
    } else {
      props.showAlert(" Invalid credentials ", "danger")
    }
  }
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='container md-3'>
      <h2>
        Login
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={credentials.email} id="email" name='email' onChange={onchange} aria-describedby="emailHelp" />
        </div>

        <div className="col-auto">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} id="password" name='password' onChange={onchange} minLength="5"/>
          <div id="password" className="form-text" style={{color:"black"}}>We'll never share your password with anyone else.</div>
        </div>

        <button type="submit" className="btn btn-success my-1">Submit</button>
      </form>

    </div>
  )
}

export default Login

