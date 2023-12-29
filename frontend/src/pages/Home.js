import React from 'react'
import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Note from './Note'
import { refreshAccessToken } from '../utils/authService';

const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    const [data, setData] = useState([])
    const [rerender, setRerender] = useState(false)
    const [refresh, setRefresh] = useState(user.refreshToken)

    useEffect(() => {
        fetchData()
        setRerender(false)
    }, [rerender])

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const newAccessToken = await refreshAccessToken(refresh);
                setRefresh(newAccessToken.refresh)
                localStorage.setItem('user', JSON.stringify({...user, authToken: newAccessToken.access, refreshToken: newAccessToken.refresh}))
            } catch (error) {
                console.error('Token refresh failed:', error);
            }
        }, 60000); 

        return () => clearInterval(intervalId);
    }, [refresh])

    const fetchData = async () => {
        const response = await fetch(`http://localhost:8000/api/notes/${user.username}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.authToken}`
            },
        })
        const data = await response.json()
        setData(data)
    }
    return (
        <div className='flex items-center justify-center bg-black/30 h-screen w-full'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center'>
                {data.map((note, i) => 
                    <Note key={i} note={note} setRerender={setRerender}/>
                )}
            </div>
        </div>
    )
}

export default Home