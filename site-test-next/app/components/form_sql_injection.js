import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function SQLInjectionForm() {
    const [id, setId] = useState('');
    const router = useRouter();

    async function handleSubmit() {
        if(id != ''){
            const apiUrlEndpoint = "/api/users/getuser?id="+id;
            router.push(apiUrlEndpoint)
        }
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