import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import InputSearchBar from './InputSearchBar'
import { Link, useNavigate } from "react-router-dom"

const Home = () => {
  const { user } = useContext(UserContext)
  const [recentUsers, setRecentusers] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchrecentUsersdata = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/users?limit=3`)
        const data = await res.json()
        if (res.ok) {
          setRecentusers(data)
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchrecentUsersdata()
  }, [])
  // console.log(recentUsers);
  return (
    <div className='p-10 bg-slate-200 min-h-screen'>
      <div className='bg-slate-500 p-2 rounded-md'>
        <div className='flex justify-between px-1 text-lg font-semibold'>
          <h2 className='capitalize'>Payments App</h2>
          <div>Hello {user?.rest?.username}</div>
        </div>
        <div className='px-1 font-semibold my-2'>Total Balance : {user?.totalbalance}</div>
        <InputSearchBar />
        <div className='mt-4'>
          {recentUsers.map((user) => {
            return (
              <div key={user._id} className='my-1 border p-2 rounded-md flex justify-between items-center gap-2'>
                <div>{user.username}</div>
                <div>
                  <Link to={`/sendmoney/${user._id}`}>
                    <button className='px-2 py-1 text-sm rounded-lg bg-blue-700 text-white'>Send Money</button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
