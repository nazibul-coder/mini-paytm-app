import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const InputSearchBar = () => {
    const [modal, setModal] = useState(false)
    const [textInput, setTextInput] = useState('')
    const [users, setUsers] = useState([])

    const fetchData = async (text) => {
        try {
            const res = await fetch(`http://localhost:3000/api/v1/users`)
            const data = await res.json()
            if (res.ok) {
                let x = data.filter(user =>
                    user.username.toLowerCase().includes(text.toLowerCase()))
                setUsers(x)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <input type='text' value={textInput} onChange={(e) => {
                setTextInput(e.target.value)
                fetchData(textInput)
            }} onFocus={() => setModal(true)} onBlur={()=>setTimeout(() => {
                setModal(false)
            }, 200)} className='w-full mx-auto rounded-md p-2 outline-none' placeholder='Search Users'
            />
            <div className={`h-36 bg-white mt-1 rounded p-2
                ${modal ? 'block' : "hidden"} 
            `}>
                {users.map((user)=>{
                    return <p className='py-1 cursor-pointer'>
                        <Link to={`/sendmoney/${user._id}`}>
                            {user.username}
                        </Link>
                    </p>
                })}
            </div>
        </div>
    )
}

export default InputSearchBar
