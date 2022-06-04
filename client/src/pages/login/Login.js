/* eslint-disable no-unused-vars */
import axios from "axios"
import React, { useState } from "react"
import { useAuthContext } from "../../context/userContext"

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })

  const { user, loading, error, dispatch } = useAuthContext()

  const handleChange = (e) => {
    setCredentials((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post("/auth/login", credentials)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
    }
  }

  //   console.log(user)

  return (
    <div>
      <div className="login">
        <div className="lContainer">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="lInput"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="lInput"
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit} className="lBtn">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  )
}

export default Login
