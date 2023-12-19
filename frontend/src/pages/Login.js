import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../Store/AuthSlice';

const Login = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        const response = await fetch(`http://localhost:8000/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: userName, password: password}),
        })
        
        if(response.ok){
            const data = await response.json()
            dispatch(login({username: userName, authToken: data.access, refreshToken: data.refresh}))
            localStorage.setItem('user', JSON.stringify({username: userName, authToken: data.access, refreshToken: data.refresh}))
            navigate('/');
            window.location.reload();
        }
    }

    const handleCallbackResponse = (response) => {
        console.log(response.credential)
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "587011555651-v0ftah0g405q73ctbmifkj76h9eafk7i.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
        );
    }, []);

    return (
        <div className="flex items-center justify-center bg-black bg-opacity-30 h-screen mt-30%">
            <div className="bg-yellow-200 p-4 rounded-md shadow-md w-1/3">
                <h2 className="text-xl font-bold mb-2 text-center">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    required
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-6 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <div id="signInDiv"></div>
            </div>
        </div>
    );
};

export default Login;