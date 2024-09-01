import React, { useState } from 'react';

const StatisticsModal = ({ isOpen, onClose, sendDataToCloud }) => {
    const [isSending, setIsSending] = useState(false);
    const [internetConnected, setInternetConnected] = useState(true); // Assume connected initially
    const [confirmationVisible, setConfirmationVisible] = useState(false);

    const handleSendData = async () => {
        setConfirmationVisible(true);
    };

    const handleConfirmSendData = async () => {
        if (!navigator.onLine) {
            setInternetConnected(false);
            return;
        }

        setInternetConnected(true);
        setIsSending(true);

        // Simulate a network request delay
        setTimeout(() => {
            setIsSending(false);
            alert("Dados enviados com sucesso!");
            onClose(); // Close the modal after sending data
        }, 3000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96">
                {!confirmationVisible ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Estatísticas do Sistema</h2>
                        <p className="mb-2">Quantidade de Pesquisas Realizadas: {123}</p>
                        <p className="mb-2">Quantidade de Pesquisas por Bairro:</p>
                        <ul className="mb-4">
                            <li>Centro: 45</li>
                            <li>Freitas: 30</li>
                            <li>São Judas: 20</li>
                            {/* Add more neighborhoods as needed */}
                        </ul>
                        <div className="flex justify-between">
                            <button
                                onClick={onClose}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none"
                            >
                                Sair
                            </button>
                            <button
                                onClick={handleSendData}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                            >
                                Enviar Dados para Nuvem
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {isSending ? (
                            <p className="text-center">Enviando dados...</p>
                        ) : internetConnected ? (
                            <>
                                <p className="mb-4 text-center">
                                    Para enviar os dados para Nuvem, é necessário que tenha conexão com Internet.
                                    Deseja Continuar com o Envio?
                                </p>
                                <div className="flex justify-between">
                                    <button
                                        onClick={onClose}
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleConfirmSendData}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p className="text-red-500 text-center">
                                Não há conexão com a Internet. Tente novamente mais tarde.
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default StatisticsModal;