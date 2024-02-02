"use client"
import React, { useState } from 'react';

export default function MonFormulaireUpload() {
    const [isError,setIsError] = useState(false)

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        // Effectuer une requête POST pour télécharger le fichier
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log('File uploaded successfully');
        } else {
            setIsError(true)
            console.error('Error uploading file');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileUpload} />
            <div>{isError ? "file not upload" : null}</div>
        </div>
    );
}