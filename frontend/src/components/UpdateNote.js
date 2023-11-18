import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faPenToSquare
} from '@fortawesome/free-solid-svg-icons';

const UpdateNote = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [inputText, setInputText] = useState('');
    const [savedText, setSavedText] = useState('');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    //fetch data on render
    const fetchData = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/notes/${id}/`)
        const data = await response.json()
        setInputText(data.body)
    }
    useEffect(() => {
        fetchData()
    }, [])

    const handleSaveClick = async () => {
        try{
            fetch(`http://127.0.0.1:8000/api/notes/${id}/`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({body: inputText})
            })
            setInputText('')
            navigate('/notes')
        }catch(error){
            console.log(error)
        }
    };

    return (
        <div className="flex items-center justify-center bg-black/30 h-screen mt-30%">
            <div className="bg-yellow-200 p-4 rounded-md shadow-md w-1/3">
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-2 text-center">Edit</h2>
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

export default UpdateNote;