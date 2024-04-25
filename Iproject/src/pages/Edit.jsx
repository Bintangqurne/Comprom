import React from "react" 
import { useState } from 'react'
import "../index.css"
import IsiAdd from "../components/IsiAdd"
import IsiEdit from "../components/IsiEdit"

function Edit() {
    const [count, setCount] = useState(0)

  return (
    <>
      <div className='text-white flex justify-center items-center bg-cover' style={{'backgroundImage': 'url("../src/assets/bg.jpg")', height: "100vh"}}>
        <IsiEdit/>
      </div>
    </>
  )
}

export default Edit
