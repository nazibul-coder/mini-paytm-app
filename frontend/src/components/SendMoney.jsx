import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SendMoney = () => {
    const {userId}=useParams()
    const [amount,setAmount]=useState(0)
    const [username,setUsername]=useState('')
    const navigate=useNavigate()
    const [message,setmessage]=useState(null)
    useEffect(()=>{
       const fetchUsername=async()=>{
        try {
            const res=await fetch(`http://localhost:3000/api/v1/user/${userId}`)
            const data=await res.json()
            if(res.ok){
                setUsername(data[0].username)
            }
        } catch (error) {
            console.log(error);
        }
       }
       fetchUsername()
    },[])
    
    const handleSubmit=async(event)=>{
        event.preventDefault()
        try {
            const res=await fetch(`http://localhost:3000/api/v1/transferfund/${userId}`,
                {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({amount}),
                    credentials:'include'
                })
            const data=await res.json()
           if(res.ok){
                setAmount(0)
                setmessage(data)
                navigate('/')
           }
           if(!res.ok){
            setmessage(data)
           }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-[250px] mx-auto '>
            <div className='h-[300px] rounded-md mt-24 flex flex-col gap-8 justify-center items-center bg-slate-300'>
                <div className='text-lg font-semibold'>Send Money</div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <p className='text-xs mb-[-4px] ml-1'>{username}</p>
                    <input value={amount} onChange={(e)=>setAmount(e.target.value)} className='text-end p-2 rounded no-spinners' type="number" />
                    <button type='submit' className='bg-green-600 rounded-md text-white p-2'>Initiate Transfer</button>
                </form>
                <p className='text-green-600 font-semibold text-lg'>{message}</p>
            </div>
        </div>
    )
}

export default SendMoney
