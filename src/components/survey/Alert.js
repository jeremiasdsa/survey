import React, { useState, useEffect } from 'react';

const Alert = ({ message, type }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 13000); // Disappear after 3 seconds

        return () => clearTimeout(timer); // Cleanup the timer
    }, []);

    if (!visible) return null;

    return (
        //Revisar se fixa o Alerta no topo dos demais: fixed top-16
        // <div className="text-center pt-10 p-6 mr-4 ml-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div
                className={`transition-opacity duration-500 ease-in-out ${
                    visible ? 'opacity-100' : 'opacity-0'
                } flex items-center p-4 mb-4 text-sm ${
                    type === 'error' ? 'text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400' : 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400'
                } rounded-lg`}
                role="alert"
            >
            <svg
                className="flex-shrink-0 w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div className="ms-3 text-sm font-medium">{message}</div>
        </div>
    );
};

export default Alert;