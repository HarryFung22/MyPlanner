import React from 'react'
import {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Note from './Note'

const Home = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    const [data, setData] = useState([])
    const [rerender, setRerender] = useState(false)
    useEffect(() => {
        fetchData()
        setRerender(false)
    }, [rerender])

    const fetchData = async () => {
        const response = await fetch(`http://localhost:8000/api/notes/${user.username}/`)
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