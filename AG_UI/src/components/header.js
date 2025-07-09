import React, { useState } from 'react';
import './css/header.css';
import './css/sidebar.css';
import './css/logo.css';
import Logo from './logo';

import { FaSun, FaMoon } from 'react-icons/fa';
import { GoSidebarCollapse } from "react-icons/go";
import { ReactComponent as FoggyIcon } from './css/materials/foggy_icon.svg'; // Import SVG as a React component
import Sidebar from './Sidebar'; // Import Sidebar component


const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isPublic, setIsPublic] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode', !isDarkMode);
    };

    const toggleVisibility = () => {
        setIsPublic(!isPublic);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <header className={`header ${isDarkMode ? 'dark-mode' : ''}`}>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gabarito&display=swap" />

                <GoSidebarCollapse className={`sidebar-toggle ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleSidebar} />

                <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} isDarkMode={isDarkMode} />

                <div className="title-container">
                <Logo isDarkMode={isDarkMode} className="logo" style={{ width: '2.5rem', height: '2.5rem' }} />
                    <h1 className={`title ${isDarkMode ? 'dark-mode' : ''}`}>PriceHawk.Ai</h1>
                </div>

                <div className="visibility-toggle" onClick={toggleVisibility}>
                    <span className={`label ${isDarkMode ? 'dark-mode' : ''} ${isPublic ? 'active' : ''}`}>Public</span>
                    <div className={`visibility-switch ${isPublic ? 'public' : 'private'} ${isDarkMode ? 'dark-mode' : ''}`}></div>
                    <span className={`label ${isDarkMode ? 'dark-mode' : ''} ${!isPublic ? 'active' : ''}`}>Private</span>
                </div>

                <div className="toggle" onClick={toggleTheme}>
                    <div className={`toggle-circle ${isDarkMode ? 'dark-mode' : ''}`}>
                        {isDarkMode ? <FaMoon className="icon-moon" /> : <FaSun className="icon-sun" />}
                    </div>
                </div>
            </header>

           
        </>
    );
};

export default Header;
