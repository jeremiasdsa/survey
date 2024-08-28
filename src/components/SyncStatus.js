import React, { useEffect, useState } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database } from "../firebase";

const SyncStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isConnectedToFirebase, setIsConnectedToFirebase] = useState(false);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        const connectedRef = ref(database, '.info/connected');
        const syncHandler = onValue(connectedRef, (snapshot) => {
            if (snapshot.val() === true) {
                console.log('Connected to Firebase!');
                setIsConnectedToFirebase(true);
            } else {
                console.log('Disconnected from Firebase.');
                setIsConnectedToFirebase(false);
            }
        });

        return () => {
            off(connectedRef, syncHandler);
        };
    }, []);

    return (
        <div>
            <p>Status: {isOnline ? 'Online' : 'Offline'}</p>
            <p>Firebase: {isConnectedToFirebase ? 'Connected' : 'Disconnected'}</p>
        </div>
    );
};

export default SyncStatus;