import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faPenToSquare
} from '@fortawesome/free-solid-svg-icons';

const CreateNote = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    const navigate = useNavigate()
    const [inputText, setInputText] = useState('');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleSaveClick = async () => {
        try{
            const response = await fetch(`http://localhost:8000/api/notes/${user.username}/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.authToken}`
                },
                body: JSON.stringify({body: inputText})
            })

            if(response.ok){
                setInputText('')
                navigate('/')
            }
        }catch(error){
            console.log(error)
        }
    };

    return (
        <div className="flex items-center justify-center bg-black/30 h-screen mt-30%">
            <div className="bg-yellow-200 p-4 rounded-md shadow-md w-1/3">
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-2 text-center">Create note</h2>
                    <label htmlFor="textInput" className="block text-sm font-medium text-gray-700">
                        Body:
                    </label>
                    <input
                        type="text"
                        id="textInput"
                        className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 overflow-hidden overflow-wrap break-word"
                        value={inputText}
                        onChange={handleInputChange}
                />
                </div>
                <div className="p-4">
                    <strong>Preview:</strong>
                    <p className="mt-2 overflow-hidden break-word">{inputText}</p>
                </div>
                <div className="p-4 flex justify-end">
                    <button
                        className="bg-yellow-500 border border-yellow-600 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                            handleSaveClick()
                        }}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateNote;