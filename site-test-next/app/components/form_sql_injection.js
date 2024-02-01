import React, { useState, useEffect } from 'react';

export default function SQLInjectionForm() {
    const [id, setId] = useState('');

    async function handleSubmit() {
        const apiUrlEndpoint = "http://localhost:3000/api/users/getuser";
        const response = await fetch(apiUrlEndpoint);
        const res = await response.json();
        alert(response)
    }

    return (
        <div>
            <h1>Form Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter ID:
                    <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

