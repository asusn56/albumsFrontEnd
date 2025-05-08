import { Navigate } from "react-router"
import { useAuth } from "../AuthContext"
import { useEffect, useState } from "react"
import api from "../api";
import axios from "axios";
import userAuth from "../api/userAuth";

const ProfilePage = () => {

  
  const { user, loading, logoutUser, updateUser } = useAuth()
  
  const [username, setUsername] = useState(user.username)
  useEffect(() => {
    if (user) setUsername(user.username); 
  }, [user]);

  if (loading) {
    return <p>Loading...</p>
  }

  if (!user) {
    return <Navigate to={'/login'} />
  }

  const isExpired = user.exp * 1000 < Date.now()

  if (isExpired) {
    logoutUser()
    return <Navigate to={'/login'} />
  }

  const usernameHandler = event => setUsername(event.target.value)

  const submitHandler = async event => {
    event.preventDefault()

    try {
    //   const { data } = await api.put('/users/update', { username })
    //   const { data } = await  userAuth.put('users/', { username })
      const { data } = await userAuth.put(`/users/${user._id}`, { username });
      
      updateUser(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Username: {user.username}</h2>
      <h2>Email: {user.email}</h2>
      <h2>Role: {user.role}</h2>

      <form onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" value={username} onChange={usernameHandler} />
        </div>

        <button type="submit">Edit</button>
      </form>
    </div>
  )
}

export default ProfilePage