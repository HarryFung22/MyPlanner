import React from 'react'

const refreshAccessToken = async (refreshToken) => {
    const response = await fetch('http://localhost:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            refresh: refreshToken,
        }),
    })

    if (response.ok) {
        const data = await response.json();
        return data; 
    } else {
        throw new Error('Token refresh failed');
    }
}

export { refreshAccessToken };