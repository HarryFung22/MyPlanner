import React, {useState} from 'react';

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        const response = await fetch(`http://127.0.0.1:8000/api/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password}),
        })
        const data = await response.json()
        console.log(data)
    }

    return (
        <div className="flex items-center justify-center bg-black bg-opacity-30 h-screen mt-30%">
            <div className="bg-yellow-200 p-4 rounded-md shadow-md w-1/3">
                <h2 className="text-xl font-bold mb-2 text-center">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-6 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button
                    className="w-full bg-yellow-500 py-2 rounded-md text-white font-semibold hover:bg-yellow-600 hover:text-black border border-yellow-600 transition duration-300"
                    onClick={() => {
                        handleSubmit()
                    }}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;