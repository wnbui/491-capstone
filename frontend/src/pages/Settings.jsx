import React, { useState } from 'react';
import { Layout } from '../Layout';

export const Settings = () => {
    const languages = ['English', 'Español', '官话'];
    const [language, setLanguage] = useState('English')
    const [languageSelect, toggleLanguageSelect] = useState(false);

    const selectLanguage = (language) => {
        setLanguage(language);
        toggleLanguageSelect(false);
    };

    const languageToggle = () => {
        toggleLanguageSelect(!languageSelect);
    };

    return (
        <Layout pageTitle="SETTINGS">
        <div style={{ display: 'flex' }}>
        <div style={{
            flex: 2,
            display: 'flex',
            flexDirection: 'row',
            border: '1px solid black',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            overflow: 'auto',
            borderRadius: '8px',
            alignItems: 'left'
        }}>
            <p style = {{
                fontSize: '20px',
                marginRight: '20px',
                marginTop: '7.5px'
            }}>Language = </p>
            <div onClick = {toggleLanguageSelect} style={{
                display: 'flex',
                height: '50px',
                width: '500px',
                border: '1px solid black',
                padding: '20px',
                backgroundColor: '#a5a5a5ff',
                overflow: 'auto',
                borderRadius: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
            }}>{language}</div>
            {languageSelect && (
            <div style={{
                position: 'absolute',
                top: '100px',
                left: '150px',
                border: '1px solid black',
                backgroundColor: '#fff',
                borderRadius: '8px',
                zIndex: 10,
                width: '150px',
                boxShadow: '0px 4px 6px rgba(0,0,0,0.1)'
            }}>
              {languages.map((language) => (
                <div
                key={language}
                onClick={() => selectLanguage(language)}
                style={{
                    padding: '10px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #ddd',
                }}>{language}</div>
            ))}</div>)}
        </div>
        </div>
        </Layout>
    );
};