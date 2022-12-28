import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { requestForToken, onMessageListener } from './firebase';
import { io } from 'socket.io-client';

const Notification = () => {
    const [notification, setNotification] = useState(null);
    const socket = io('http://10.10.21.75:3001');

    React.useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
        });
    }, []);

    const handleSendNotification = () => {
        socket.emit('send-notification', requestForToken());
    };

    const notify = () => toast(<ToastDisplay />);
    function ToastDisplay() {
        return (
            <div>
                <p>
                    <b>{notification}</b>
                </p>
                <button type="submit" onClick={handleSendNotification}>
                    setNotification
                </button>
            </div>
        );
    }

    useEffect(() => {
        notify();
    }, [notification]);

    requestForToken();

    onMessageListener()
        .then((payload) => {
            console.log('Message received. ', payload);
            setNotification(payload);
        })
        .catch((err) => console.log('failed: ', err));

    return <Toaster />;
};

export default Notification;
