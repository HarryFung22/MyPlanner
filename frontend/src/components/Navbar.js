import React from 'react';
import { useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faUser
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
        <div className="text-xl font-bold">MyPlanner</div>
        <div className="flex space-x-4">
            <FontAwesomeIcon icon={faPlus} onClick={() => navigate('/notes/create')}/>
            <FontAwesomeIcon icon={faUser} />
        </div>
        </nav>
    );
};

export default Navbar;