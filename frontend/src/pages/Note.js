import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux';
import {
    faPenToSquare,
    faTrash
} from '@fortawesome/free-solid-svg-icons';

const Note = ({ note, setRerender }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const handleDelete = async () => {
    fetch(`http://127.0.0.1:8000/api/notes/${user.username}/${note.id}/`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      },
    })
    setRerender(true)
  }
  const navigate = useNavigate()
  return (
    <div className="bg-yellow-200 p-4 rounded-md shadow-md w-48 h-48 relative">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="mb-4 text-center">{note.body}</div>
        <div className="absolute top-2 right-2">
          <FontAwesomeIcon icon={faPenToSquare} onClick={() => navigate(`/update/${note.id}`)} className='mr-2'/>
          <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete()}/>
        </div>
      </div>
    </div>
  );
};

export default Note;