import axios from "axios"
import React from "react"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from '../AuthContext.js'


const LoginPage = () => {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const userEmailHandler = event => setEmail(event.target.value)
  const userPasswordHandler = event => setPassword(event.target.value)

  const loginHandler = async event => {
      event.preventDefault()

      try {
        const loginInfo = { email, password }
        const res = await axios.post('http://localhost:5000/api/users/login', loginInfo)
        const { token } = res.data

        if (token) {
          loginUser(token)
       
          navigate('/')
        }
      } catch (error) {
        console.log('Failed to login', error)
      }
  }

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={loginHandler}>
          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" value={email} onChange={userEmailHandler} />
          </div>

          <div className="form-control">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" value={password} onChange={userPasswordHandler} />
          </div>

          <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default LoginPage