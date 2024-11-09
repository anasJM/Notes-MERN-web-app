import React from 'react'
import Navbar from "../../components/Navbar/Navbar";

const Login = () => {
  return (
    <>
      <Navbar />
      <div>
        <div>
          <form onSubmit={() => {}}>
            <h4 className='text-2xl mb-7'>Login</h4>
            <input type="text" placeholder='Email' className='input-box' />
          </form>
        </div>
      </div>
    </>
  )
}

export default Login