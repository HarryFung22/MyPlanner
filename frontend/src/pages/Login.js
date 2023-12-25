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
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: userName, password: password}),
        })
        
        if(response.ok){
            const data = await response.json()
            dispatch(login({username: userName, authToken: data.access, refreshToken: data.refresh}))
            
            navigate('/');
            window.location.reload();
        }
    }

    const handleCallbackResponse = (response) => {
        const [header, payload, signature] = response.credential.split('.')
        console.log(header)
        //set local storage
        // let temp = (JSON.parse(atob(payload)))
        // console.log(temp.email)
        localStorage.setItem('user', atob(payload))
        localStorage.setItem('token', response.credential)

        navigate('/');
        window.location.reload();
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
                <div id="signInDiv"></div>
            </div>
        </div>
    );
};

export default Login;