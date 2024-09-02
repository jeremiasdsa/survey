import React, { useState, useEffect } from 'react';

const StatisticsModal = ({ isOpen, onClose, countStoredData }) => {
    const [surveyCount, setSurveyCount] = useState(0);
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Reset the modal state when it's opened
            setMessage('');
            setSending(false);
            // Fetch the count of surveys
            countStoredData().then(count => setSurveyCount(count)).catch(err => console.error(err));
        }
    }, [isOpen, countStoredData]);

    const sendDataToCloud = () => {
        if (!navigator.onLine) {
            setMessage('Sem conexão com a Internet. Por favor, conecte-se e tente novamente.');
            return;
        }

        setSending(true);
        // Simulate sending data to the cloud
        setTimeout(() => {
            setSending(false);
            setMessage('Dados enviados com sucesso!');
        }, 3000); // Simulate 3 seconds delay for sending data
    };

    // Close the modal and reset state
    const handleClose = () => {
        setMessage('');
        setSending(false);
        onClose();
    };

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div
                    className="bg-white mr-safe-offset-1 ml-safe-offset-1 dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative z-10">
                    <h2 className="text-xl font-semibold text-center mb-4 dark:text-white">Estatisticas do Sistema</h2>

                    {message ? (
                        <div className="text-center">
                            <p className="'text-sm font-sans font-medium text-gray-700 dark:text-gray-300 mb-6 '>">
                                {message}</p>
                            {!sending && (
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    onClick={handleClose}
                                >
                                    Fechar
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            {sending ? (
                                <div
                                    className="text-lg items-center justify-center font-semibold text-gray-700 dark:text-gray-300">Enviando...
                                    <div
                                        className="loader mt-4 items-center border-t-4 border-blue-500 rounded-full w-10 h-10 animate-spin"></div>
                                </div>
                            ) : (
                                <div className="mb-6">
                                    <p className='text-sm font-sans font-medium text-gray-700 dark:text-gray-300 mb-6 '>
                                        Pesquisas Realizadas: {surveyCount}</p>
                                    <p className='text-sm font-sans font-medium text-gray-700 dark:text-gray-300 mb-6 '>Quantidade
                                        de Pesquisas por Bairro: {/* Add logic for counting by neighborhood */}</p>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    onClick={handleClose}>
                                    Sair
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    onClick={sendDataToCloud}
                                    disabled={sending}>
                                    Enviar Dados
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatisticsModal;