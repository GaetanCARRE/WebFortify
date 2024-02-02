"use client";

import React, { useState } from 'react';
import getUserByUsername from '../back/db';

export default function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log("handle login");
        const results = getUserByUsername(username);
        if (results.length > 0) {
            const user = results[0];
            if (password === user.password) {
                console.log('Login successful');
            } else {
                console.error('Incorrect password');
            }
        } else {
            console.error('User not found');
        };
    };

    return (
        <div>
            <label>Username:  </label>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <br></br>
            <label>Password:  </label>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <br></br>
            <button type="button" onClick={() => handleLogin()}>Login</button>
        </div>
    );
}
