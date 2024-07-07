import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const SignIn = () => {
    const navigate = useNavigate()
    const {setUser}=useContext(UserContext)
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        const updatedFormData = { ...formData, [id]: value };

        // console.log('Before state update:', formData); // Logs the current state, not the updated one
        setFormData(updatedFormData);
        // console.log('After state update:', formData); // Still logs the current state, not the updated one
        // console.log(`Updated value for ${id}:`, updatedFormData[id]); // Logs the updated value
    };
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch(`http://localhost:3000/api/v1/signin`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify(formData),
                    credentials:'include'
                }
            )
            const data=await res.json()
            console.log(data);
            if(res.ok) {
                setUser(data)
                navigate('/');
            } else {
                console.error('Error:', data);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='flex flex-col justify-center items-center min-h-screen'>
            <h2 className='text-center font-semibold text-2xl mb-2'>Sign In</h2>
            <form onSubmit={handleSubmit} className='flex flex-col w-[420px] bg-slate-400 rounded-lg px-5 py-7 pb-4'>
                <div className='flex flex-col gap-1 my-1 mx-4'>
                    <label className='capitalize' htmlFor="email">email</label>
                    <input value={formData.email} onChange={handleChange} type="text" id='email' className='p-2 rounded-md ' />
                </div>
                <div className='flex flex-col gap-1 my-1 mx-4'>
                    <label className='capitalize' htmlFor="password">password</label>
                    <input value={formData.password} onChange={handleChange} type="text" id='password' className='p-2 rounded-md ' />
                </div>
                <div className='flex flex-col gap-1 my-1 mt-5 rounded-md mx-4 transition-all duration-300'>
                    <button type='submit' className='bg-white p-2 rounded-md hover:bg-black hover:text-white transition-all duration-300'>Submit</button>
                </div>
                <div className='flex justify-between items-center text-sm mx-4'>
                    <div>Don't have account?</div>
                    <button  className='text-red-600'><Link to={'/signup'}>Sign up</Link></button>
                </div>
            </form>
        </div>
    )
}

export default SignIn
