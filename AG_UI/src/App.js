import React, { useEffect, useState } from 'react';
import Header from './components/header';
import Chat from './components/chat';
import './App.css';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isPublic, setIsPublic] = useState(true);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const toggleVisibility = () => {
        setIsPublic(prevVisibility => !prevVisibility);
    };

    return (
        <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <Header
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                isPublic={isPublic}
                toggleVisibility={toggleVisibility}
            />
            <Chat
                isDarkMode={isDarkMode}
                isPrivate={!isPublic}
            />
        </div>
    );
}

export default App;
