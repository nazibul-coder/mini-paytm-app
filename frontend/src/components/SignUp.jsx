import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate=useNavigate()
  // const [formData, setFormData] = useState({
  //   username: "", email: "", password: "", balance: 0
  // })
  // const handleChnage = (event) => {
  //   let {id} = (event.target);
  //   console.log(id);
  //   console.log(formData[username]);
  //   console.log(formData[`'${id}'`]);
  //   setFormData({ ...formData, [event.target.id]: event.target.value })
  //   // console.log(x);
  // }
  // useEffect(() => {
  //   console.log('Updated formData:', formData);
  // }, [formData]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    balance: 0
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    const updatedFormData = { ...formData, [id]: value };
    
    // console.log('Before state update:', formData); // Logs the current state, not the updated one
    setFormData(updatedFormData);
    // console.log('After state update:', formData); // Still logs the current state, not the updated one
    // console.log(`Updated value for ${id}:`, updatedFormData[id]); // Logs the updated value
  };
  const handleSubmit=async(event)=>{
    // http://localhost:3000/api/v1/signin
    event.preventDefault()
    try {
      const res=await fetch(`http://localhost:3000/api/v1/signup`,
        {
          method:"POST",
          headers:{
            'Content-Type':"application/json"
          },
          body:JSON.stringify(formData)
        }
      )
      const data=await res.json()
     if(res.ok){
        navigate('/signin')
     }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='flex flex-col justify-center items-center min-h-screen'>
      <h2 className='text-center font-semibold text-2xl mb-2'>Sign Up</h2>
      <form onSubmit={handleSubmit} className='flex flex-col w-[420px] bg-slate-500 rounded-lg px-5 py-7 pb-4'>
        <div className='flex flex-col gap-1 mx-4 my-1'>
          <label className='capitalize' htmlFor="username">username</label>
          <input type="text" value={formData.username} onChange={handleChange} id='username' className='p-2 rounded-md ' />
        </div>
        <div className='flex flex-col gap-1 my-1 mx-4'>
          <label className='capitalize' htmlFor="email">email</label>
          <input type="text" value={formData.email} onChange={handleChange} id='email' className='p-2 rounded-md ' />
        </div>
        <div className='flex flex-col gap-1 my-1 mx-4'>
          <label className='capitalize' htmlFor="password">password</label>
          <input type="text" value={formData.password} onChange={handleChange} id='password' className='p-2 rounded-md ' />
        </div>
        <div className='flex flex-col gap-1 my-1 mx-4'>
          <label className='capitalize flex items-center' htmlFor="balance">balance
            <span className='text-red-600 flex items-center lowercase text-xs ml-1'>
              <span className='mb-[-2px]'>*</span>
              <span className='mt-[-1px]'>optional</span>
            </span>
          </label>
          <input type="text" value={formData.balance} onChange={handleChange} id='balance' className='p-2 rounded-md ' />
        </div>
        <div className='flex flex-col gap-1 mt-5 mb-1 rounded-md mx-4 transition-all duration-300'>
          <button type='submit' className='bg-white p-2 rounded-md hover:bg-black hover:text-white transition-all duration-300'>Submit</button>
        </div>
        <div className='flex justify-between items-center text-sm mx-4'>
          <div>Already have an account?</div>
          <button className='text-red-600'><Link to={'/signin'}>Sign in</Link></button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
