import React from 'react'
import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Note from './Note'

const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')

    const [data, setData] = useState([])
    const [rerender, setRerender] = useState(false)
    useEffect(() => {
        fetchData()
        setRerender(false)
    }, [rerender])

    console.log(token)

    const fetchData = async () => {
        const response = await fetch(`http://localhost:8000/api/notes/${user.email}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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