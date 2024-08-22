// SyncStatus.js

import React, { useEffect, useState } from 'react';
// import { database } from '../firebase';

const SyncStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

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
        // const syncHandler = database.ref('.info/connected').on('value', (snap) => {
        //     if (snap.val() === true) {
        //         console.log('Connected to Firebase!');
        //     } else {
        //         console.log('Disconnected from Firebase.');
        //     }
        // });
        //
        // return () => {
        //     database.ref('.info/connected').off('value', syncHandler);
        // };
    }, []);

    return (
        <div>
            <p>Status: {isOnline ? 'Online' : 'Offline'}</p>
        </div>
    );
};

export default SyncStatus;