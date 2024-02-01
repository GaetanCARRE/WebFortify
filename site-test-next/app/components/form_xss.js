"use client";
import React, { useState } from 'react';

function MonFormulaireXSS() {
    const [titre, setTitre] = useState('');
    const [content, setContent] = useState('');
    const [submittedText, setSubmittedText] = useState('');

    const handleSubmit = () => {
        // Mettez à jour submittedText avec le texte des champs titre et content
        const newText = `Your comment has been posted!${titre} \n\n ${content}`;
        setSubmittedText(newText);
    };

    return (
        <div>
            <div>
                <label>Titre:</label>
                <input
                    type="text"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                />
            </div>
            <div>
                <label>Content:</label>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <button type='button' onClick={handleSubmit}>Submit</button>

            <div>{submittedText}</div>
        </div>
    )
}

export default MonFormulaireXSS; 