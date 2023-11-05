import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'

const NotesListPage = () => {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        const data = await fetch('http://127.0.0.1:8000/api/notes/')
        const response = await data.json()
        setNotes(response)
        console.log(response)

    }
  return (
    <div>
        {notes.map((note, i) => 
          <ListItem key={i} note={note}/>
        )}
    </div>
  )
}

export default NotesListPage