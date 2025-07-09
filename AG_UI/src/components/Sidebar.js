import React from 'react';
import './css/sidebar.css';

const Sidebar = ({ isOpen, onClose, isDarkMode }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
            <button className={`close-btn ${isDarkMode ? 'dark-mode' : ''}`} onClick={onClose}>×</button>
            <div className="sidebar-content">
                <h2 className={isDarkMode ? 'dark-mode' : ''}>Sidebar</h2>
                <ul>
                    <li><a href="#section1">Section 1</a></li>
                    <li><a href="#section2">Section 2</a></li>
                    <li><a href="#section3">Section 3</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
