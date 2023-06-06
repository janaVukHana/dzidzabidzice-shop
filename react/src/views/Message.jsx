import { useEffect, useState } from 'react';
import './Message.css';
import Spinner from '../components/Spinner';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

function replaceNewlinesWithBreaks(text) {
    return text.replace(/\n/g, '<br />');
  }

export default function Message() {
    const [messages, setMessages] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = () => {
        axiosClient.get('/message')
            .then(({ data }) => {
                setMessages(data.data);
                setIsLoading(false);
            });
    };

    const handleClick = (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) {
            return;
        }
        
        axiosClient.delete('/message/' + id)
            .then(() => {
                setNotification('Message deleted');
                getMessages();
            });
    };

    return (
        <div className='Message section'>
            <div className="messages-content">
                <h1>Poruke</h1>
                {isLoading && <Spinner />}
                {!isLoading && !messages && <p>No Messages!</p>}
                {messages && <p>Broj poruka: {messages.length}</p>}
                {messages && (
                    <ul className="messages-list">
                        {messages.map(message => (
                            <li key={message.id} className="message-item">
                                <div className="message-header">
                                    <span className="message-from">{message.name}</span>
                                    <span className="message-time">{message.created_at}</span>
                                </div>
                                <div className="message-body">
                                    <p className="message-email">{message.email}</p>
                                    
                                    {message.message.split('\n').map((p, index) => <p key={index}>{p}</p>)}
                                </div>
                                <button
                                    className="delete-button"
                                    onClick={() => handleClick(message.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
