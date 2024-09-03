import React, {useState} from 'react';
import {openDatabase} from "../storage";
import StatisticsModal from './survey/StatisticsModal';
import {forceLoad} from "@sentry/react"; // Import the modal component


const HeaderBar = ({toggleTheme, showOptions}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const countStoredData = async () => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction("dataStore", "readonly");
            const store = transaction.objectStore("dataStore");
            const countRequest = store.count();

            return new Promise((resolve, reject) => {
                countRequest.onsuccess = function (event) {
                    resolve(event.target.result);
                };
                countRequest.onerror = function (event) {
                    reject(event.target.errorCode);
                };
            });
        } catch (err) {
            console.error('[countStoredData]', err);
            return 0;
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        console.log('handle logout');
        openDatabase()
            .then(db => {
                let tx = db.transaction('storage', 'readwrite');
                let store = tx.objectStore('storage');

                store.delete('user');
            }).catch(err => {
                console.error('[handleLogout]', err);
            });
        //TODO spinner?
        window.location.href = '/';
    };

    const clearCacheData = async () => {
        if ('caches' in window) {
            // Open all the caches
            const cacheNames = await caches.keys();

            // Delete all caches
            await Promise.all(cacheNames.map(cache => caches.delete(cache)));

            console.log('Cache cleared!');
        } else {
            alert('Cache API not supported in this browser.');
        }

        // Clear Local Storage
        localStorage.clear();

        // Clear Session Storage
        sessionStorage.clear();

        // Clear Cookies
        document.cookie.split(";").forEach(cookie => {
            const name = cookie.split("=")[0].trim();
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });

        // Clear IndexedDB
        const indexedDBDatabases = indexedDB.databases ? indexedDB.databases() : Promise.resolve([]);
        indexedDBDatabases.then(dbs => {
            dbs.forEach(db => {
                indexedDB.deleteDatabase(db.name);
            });
        });

        // Clear Cache Storage (Service Workers)
        if ('caches' in window) {
            caches.keys().then(function (names) {
                for (let name of names) {
                    caches.delete(name);
                }
            });
        }

        // Reload the page to ensure all changes take effect
        window.location.reload();
    }

    return (
        <div className='fixed top-0 left-0 z-20 w-full bg-zinc-900 pt-safe'>
            <header className='border-b bg-zinc-100 px-safe dark:border-zinc-700 dark:bg-zinc-800'>
                <div className='mx-auto flex h-14 max-w-screen-md items-center justify-between px-6'>
                    <h1 className='font-medium text-zinc-900 dark:text-zinc-50'>Pesquisa Opinião</h1>

                    <nav className='flex items-center space-x-0'>
                        {/*Este botao exibe um contador no Header*/}
                        {/*<button*/}
                        {/*    onClick={updateSurveyCount}*/}
                        {/*    className="inline-flex items-center px-5 py-2.5 text-xs font-mono text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"*/}
                        {/*    id='survey-count'*/}
                        {/*>*/}
                        {/*</button>*/}

                        {/*LOGOUT TRASH BUTTON*/}
                        {showOptions && (
                            <button
                                id="clear-data-site"
                                type="button"
                                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                                onClick={clearCacheData}
                            >
                                <svg
                                    id="clear-data-site"
                                    className="w-5 h-5 mb-1 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                                    fill="currentColor"
                                    viewBox="0 0 23 23"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z"
                                        fillRule="nonzero"/>
                                </svg>
                            </button>
                        )}

                        {/*STATISTIC BUTTON*/}
                        <button
                            onClick={handleOpenModal} // Open the modal on click
                            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                        >
                            <svg
                                id="theme-toggle-dart-icon"
                                className="w-5 h-5 mb-1 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                                fill="currentColor"
                                viewBox="0 0 23 23"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 24h-6v-6h6v6zm8-9h-6v9h6v-9zm8-4h-6v13h6v-13zm0-11l-6 1.221 1.716 1.708-6.85 6.733-3.001-3.002-7.841 7.797 1.41 1.418 6.427-6.39 2.991 2.993 8.28-8.137 1.667 1.66 1.201-6.001z"/>
                            </svg>
                        </button>


                        {/*THEME COLOR BUTTON*/}
                        <button
                            id="theme-toggle"
                            type="button"
                            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                            onClick={toggleTheme}
                        >
                            <svg
                                id="theme-toggle-dart-icon"
                                className="w-7 h-7 mb-1 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>

                        {/*LOGOUT BUTTON*/}
                        <button
                            id="theme-toggle"
                            type="button"
                            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                            onClick={handleLogout}
                        >
                            <svg
                                id="theme-toggle-dart-icon"
                                className="w-5 h-5 mb-1 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-500"
                                fill="currentColor"
                                viewBox="0 0 23 23"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-2 10v-.083c-1.178.685-2.542 1.083-4 1.083-4.411 0-8-3.589-8-8s3.589-8 8-8c1.458 0 2.822.398 4 1.083v-2.245c-1.226-.536-2.577-.838-4-.838-5.522 0-10 4.477-10 10s4.478 10 10 10c1.423 0 2.774-.302 4-.838v-2.162z"
                                ></path>
                            </svg>
                        </button>
                    </nav>
                </div>
            </header>

            {/* Include the StatisticsModal component */}
            <StatisticsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                countStoredData={countStoredData}
            />
        </div>
    );
};

export default HeaderBar;
