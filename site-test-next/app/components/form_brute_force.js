"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import usersData from '../lib/bruteforce.json';

export default function BruteForceForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        const user = usersData.find(u => u.username === username && u.password === password);
        if (user) {
            //alert('Connexion réussie ! Redirection...');
            router.push('/connected');
        } else {
            alert('Identifiants incorrects');
        }
    }
    
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
