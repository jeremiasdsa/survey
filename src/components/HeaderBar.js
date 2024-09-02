import React, {useState} from 'react';
import {openDatabase} from "../storage";
import StatisticsModal from './survey/StatisticsModal'; // Import the modal component


const HeaderBar = ({toggleTheme}) => {
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

    const updateSurveyCount = async () => {
        const count = await countStoredData();
        document.getElementById('survey-count').innerText = `${count}`;
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const sendDataToCloud = async () => {
        // Implement the logic to send data to the cloud
    };

    return (
        <div className='fixed top-0 left-0 z-20 w-full bg-zinc-900 pt-safe'>
            <header className='border-b bg-zinc-100 px-safe dark:border-zinc-700 dark:bg-zinc-800'>
                <div className='mx-auto flex h-14 max-w-screen-md items-center justify-between px-6'>
                    <a href='/'>
                        <h1 className='font-medium text-zinc-900 dark:text-zinc-50'>Pesquisa Opinião</h1>
                    </a>

                    <nav className='flex items-center space-x-0'>
                        {/*Este botao exibe um contador no Header*/}
                        {/*<button*/}
                        {/*    onClick={updateSurveyCount}*/}
                        {/*    className="inline-flex items-center px-5 py-2.5 text-xs font-mono text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"*/}
                        {/*    id='survey-count'*/}
                        {/*>*/}
                        {/*</button>*/}

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

                        <a href='/'>
                            <button
                                id="theme-toggle"
                                type="button"
                                className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
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
                        </a>
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

    // return (
    //     <div className='fixed top-0 left-0 z-20 w-full bg-zinc-900 pt-safe'>
    //         <header className='border-b bg-zinc-100 px-safe dark:border-zinc-700 dark:bg-zinc-800'>
    //             <div className='mx-auto flex h-14 max-w-screen-md items-center justify-between px-6'>
    //                 <a href='/'>
    //                     <h1 className='font-medium text-zinc-900 dark:text-zinc-50'>Pesquisa Opinião</h1>
    //                 </a>
    //
    //                 <nav className='flex items-center space-x-0'>
    //                     <button
    //                         onClick={updateSurveyCount}
    //                         className="inline-flex items-center px-5 py-2.5 text-xs font-mono text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //                         id='survey-count'
    //                     >
    //                     </button>
    //
    //                     <button
    //                         id="theme-toggle"
    //                         type="button"
    //                         className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
    //                         onClick={toggleTheme}
    //                     >
    //                         {/* Light Mode Icon */}
    //                         <svg
    //                             id="theme-toggle-dart-icon"
    //                             className="w-7 h-7 mb-1 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-500"
    //                             // className="hidden w-5 h-5"
    //                             fill="currentColor"
    //                             viewBox="0 0 20 20"
    //                             xmlns="http://www.w3.org/2000/svg"
    //                         >
    //                             <path
    //                                 d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
    //                                 fillRule="evenodd"
    //                                 clipRule="evenodd"
    //                             ></path>
    //                         </svg>
    //                         {/* Dark Mode Icon */}
    //                         <svg
    //                             id="theme-toggle-dark-icon"
    //                             className="hidden w-7 h-7"
    //                             fill="currentColor"
    //                             viewBox="0 0 20 20"
    //                             xmlns="http://www.w3.org/2000/svg"
    //                         >
    //                             <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
    //                         </svg>
    //                     </button>
    //
    //                     <a href='/'> {/*FAZ O LOGOUT DO APP chamando o /*/}
    //                         <button
    //                             id="theme-toggle"
    //                             type="button"
    //                             className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
    //                         >
    //                             {/* Light Mode Icon */}
    //                             <svg
    //                                 id="theme-toggle-dart-icon"
    //                                 className="w-5 h-5 mb-1 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-500"
    //                                 // className="hidden w-5 h-5"
    //                                 fill="currentColor"
    //                                 viewBox="0 0 23 23"
    //                                 xmlns="http://www.w3.org/2000/svg"
    //                             >
    //                                 <path
    //                                     d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-2 10v-.083c-1.178.685-2.542 1.083-4 1.083-4.411 0-8-3.589-8-8s3.589-8 8-8c1.458 0 2.822.398 4 1.083v-2.245c-1.226-.536-2.577-.838-4-.838-5.522 0-10 4.477-10 10s4.478 10 10 10c1.423 0 2.774-.302 4-.838v-2.162z"
    //                                 ></path>
    //                             </svg>
    //                         </button>
    //                     </a>
    //
    //                 </nav>
    //             </div>
    //         </header>
    //     </div>
    // );
};

export default HeaderBar;
