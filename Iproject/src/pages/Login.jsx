import React from "react" 
import { useState } from 'react'
import "../index.css"
import IsiLogin from '../components/IsiLogin'

function Login() {
    const [count, setCount] = useState(0)

  return (
    <>
      <div className='text-white flex justify-center items-center bg-cover' style={{'backgroundImage': 'url("../src/assets/bg.jpg")', height: "100vh"}}>
        <IsiLogin/>
      </div>
    </>
  )
}

export default Login
