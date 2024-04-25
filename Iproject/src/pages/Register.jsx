import React from "react" 
import { useState } from 'react'
import "../index.css"
import IsiLogin from '../components/IsiLogin'
import IsiRegister from "../components/IsiRegister"

function Register() {
    const [count, setCount] = useState(0)

  return (
    <>
      <div className='text-white flex justify-center items-center bg-cover' style={{'backgroundImage': 'url("../src/assets/bg.jpg")', height: "100vh"}}>
        <IsiRegister/>
      </div>
    </>
  )
}

export default Register
