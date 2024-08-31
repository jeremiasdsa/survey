import React, { useEffect, useState } from 'react';

const SaveStatus = ({ onNewSurvey }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        // Simula o loading de 3 segundos
        const timer = setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen pt-14">
            {isLoading && (
                <div className="text-lg text-gray-800">
                    Salvando...
                    {/* Adiciona um spinner */}
                    <div className="loader mt-4 border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
                </div>
            )}
            {isSuccess && (
                <div className="text-center">
                    <p className="text-2xl font-semibold text-green-500">Salvo com Sucesso!</p>
                    <button
                        onClick={onNewSurvey}
                        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Iniciar Novo Questionário
                    </button>
                </div>
            )}
        </div>
    );
};

export default SaveStatus;
