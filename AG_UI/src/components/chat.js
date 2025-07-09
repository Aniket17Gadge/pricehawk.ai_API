import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as ArrowCircleUpIcon } from './css/materials/arrow-circle-up.svg';
import './css/chat.css';
import Logochat from './logochat';

function Chat({ isDarkMode }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [sessionId, setSessionId] = useState(1000); // Start session ID at 1000
    const messagesEndRef = useRef(null);
    const chatPromptRef = useRef(null);

    // Function to handle manual session ID update
    const handleManualSessionIdChange = (newSessionId) => {
        setSessionId(newSessionId);
    };

    // Function to handle session ID updates automatically (if you want)
    const updateSessionId = (newSessionId) => {
        setSessionId(newSessionId);
    };

    // Function to generate the next session ID (increment)
    const generateNextSessionId = () => {
        setSessionId((prevSessionId) => prevSessionId + 1); // Increment session ID
    };

    const convertMarkdownToHtml = (text) => {
        // Replace **text** with <b>text</b>
        return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    };
    
    const handleSend = async () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, type: 'user' }]);
            setInput('');
            setShowWelcomeMessage(false);
            setIsBotTyping(true);
    
            try {
                const response = await fetch('http://127.0.0.1:8000/ai/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        messages: input,  // Ensure this is the correct format
                    }),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);  // Log the response for debugging
    
                    const formattedResponse = convertMarkdownToHtml(data.response);  // Convert markdown to HTML
    
                    setIsBotTyping(false);
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { text: formattedResponse, type: 'bot' },  // Use the formatted text
                    ]);
                } else {
                    setIsBotTyping(false);
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { text: "Sorry, there was an error. Please try again.", type: 'bot' },
                    ]);
                }
            } catch (error) {
                console.error("Error while fetching bot response:", error);
                setIsBotTyping(false);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "Sorry, there was an error. Please try again.", type: 'bot' },
                ]);
            }
        }
    };
    
      

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const chatPromptBar = chatPromptRef.current;

        const handleInputResize = () => {
            if (chatPromptBar) {
                chatPromptBar.style.height = 'auto'; // Reset height
                chatPromptBar.style.height = `${chatPromptBar.scrollHeight}px`; // Set to content height
            }
        };

        handleInputResize();
        window.addEventListener('resize', handleInputResize);

        return () => window.removeEventListener('resize', handleInputResize);
    }, [input]);

    useEffect(() => {
        if (chatPromptRef.current) {
            chatPromptRef.current.style.height = 'auto';
        }
    }, [messages]);

    return (
        <div className={`chat-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className={`chat-interface ${isDarkMode ? 'dark-mode' : ''}`}>
                {showWelcomeMessage && (
                    <div className="welcome-messages">
                        <div className="welcome-message">
                            <span className={`typing-effect ${isDarkMode ? 'dark-mode' : ''}`}>
                                PriceHawk: AI-Powered Deals!
                            </span>
                        </div>
                        <div className={`welcome-message ${isDarkMode ? 'dark-mode' : ''}`}>
                            Looking for the best prices? Let me find your next great deal!
                        </div>
                    </div>
                )}
                <div className="messages-container">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${msg.type} ${isDarkMode ? 'dark-mode' : ''}`}
                        >
                            {msg.type === 'bot' && (
                                <div className="bot-logo">
                                    <Logochat isDarkMode={isDarkMode} />
                                </div>
                            )}
                            {msg.text}
                        </div>
                    ))}
                    {isBotTyping && <div className={`typing-indicator ${isDarkMode ? 'dark-mode' : ''}`}>
                        <span />
                        <span />
                        <span />
                    </div>}
                    <div ref={messagesEndRef} />
                </div>
                <div
                    className={`chat-prompt-bar ${isDarkMode ? 'dark-mode' : ''}`}
                    ref={chatPromptRef}
                >
                    <input
                        className={`chat-input ${isDarkMode ? 'dark-mode' : ''}`}
                        type="text"
                        placeholder="Type a message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSend();
                            }
                        }}
                    />
                    <ArrowCircleUpIcon
                        className={`arrow-icon ${isDarkMode ? 'dark-mode' : ''}`}
                        onClick={handleSend}
                    />
                </div>
            </div>
        </div>
    );
}

export default Chat;
