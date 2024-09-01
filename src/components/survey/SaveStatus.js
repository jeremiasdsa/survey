import React, { useEffect, useState } from 'react';

const SaveStatus = ({ onNewSurvey }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        // Scroll to top on component mount
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // Simula o loading de 3 segundos
        const timer = setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center">
            {isLoading && (
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Salvando...
                    {/* Adiciona um spinner */}
                    <div className="loader mt-4 border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
                </div>
            )}
            {isSuccess && (

                <div className="text-center pt-16 p-6 mr-4 ml-4 fixed top-16">
                    <h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200'>
                        Questionário Salvo!
                    </h2>

                    <p> </p>
                    <button onClick={onNewSurvey}
                            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Clique Para Continuar
                    </button>
                </div>
            )}
        </div>
    );
};

export default SaveStatus;
