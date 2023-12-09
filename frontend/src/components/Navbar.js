import React,  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import { logout } from '../Store/AuthSlice';

const Popup = ({ onClose, onSignOut }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
            <div className="bg-white rounded-lg p-8 shadow-md w-80 text-black">
                <p className="text-center">Are you sure you want to sign out?</p>
                <div className="flex justify-center mt-4">
                    <button
                    className="mr-2 px-4 py-2 border border-gray-400 rounded-lg bg-gray-200 hover:bg-gray-300"
                    onClick={onClose}
                    >
                    Cancel
                    </button>
                    <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={onSignOut}
                    >
                    Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
  }

const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleClose = () => {
        setIsPopupOpen(false);
    };

    const handleSignOut = () => {
        dispatch(logout())
        localStorage.clear()
        handleClose();
        navigate('/login')
    };

    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
            <div className="text-xl font-bold" onClick={() => navigate('/')}>MyPlanner</div>
            <div className="flex space-x-4">
                <FontAwesomeIcon icon={faPlus} onClick={() => navigate('/create')}/>
                <FontAwesomeIcon icon={faUser} onClick={() => setIsPopupOpen(!isPopupOpen)}/>
            </div>
            {isPopupOpen && (
                <Popup
                    onClose={handleClose}
                    onSignOut={handleSignOut}
                />
            )}
        </nav>
    );
};

export default Navbar;