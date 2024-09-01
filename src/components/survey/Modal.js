import React from 'react';

const Modal = ({ isOpen, onClose, onStartSurvey }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white mr-safe-offset-1 ml-safe-offset-1 dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative z-10">
                <h2 className="text-xl font-semibold text-center mb-4 dark:text-white">Iniciar Nova Pesquisa</h2>

                <p className='text-xs font-sans font-light text-gray-700 dark:text-gray-300 mb-6 text-justify '>
                    <span className='font-medium'>Bom dia/tarde, eu sou ........</span> (mostrar
                    crachá), da equipe do
                    <span className='font-semibold'> Instituto de Pesquisa e Opinião.</span> Estamos realizando
                    uma
                    pesquisa na sua cidade e gostaríamos de contar com a sua participação. Será confidencial,
                    conforme as normas da LGPD (Lei Geral da Proteção de Dados) e preservando o anonimato dos
                    entrevistados, com uma análise das
                    respostas agregadas. Você pode participar? Muito obrigado(a).
                </p>
                <div className="text-center">
                    <button
                        onClick={onStartSurvey}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Iniciar Pesquisa
                    </button>
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default Modal;