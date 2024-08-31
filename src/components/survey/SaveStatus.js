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
        <div className="flex flex-col items-center justify-center min-h-screen pt-14">
            {isLoading && (
                <div className="text-lg text-gray-800">
                    Salvando...
                    {/* Adiciona um spinner */}
                    <div className="loader mt-4 border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
                </div>
            )}
            {isSuccess && (

                <div className="text-center">

                    <h2 className='text-xl font-semibold'>
                        Iniciar Nova Pesquisa!
                    </h2>
                    <br/>

                    <div className='mt-2'>
                        <p className='text-justify'>
                            <span className='font-medium'>Bom dia/tarde, eu sou ........</span> (mostrar
                            crachá), da equipe do
                            <span className='font-semibold'> Instituto de Pesquisa e Opinião.</span> Estamos realizando uma
                            pesquisa na sua cidade e gostaríamos de contar com a sua participação. Será confidencial,
                            conforme as normas da LGPD (Lei Geral da Proteção de Dados) e preservando o anonimato dos entrevistados, com uma análise das
                            respostas agregadas. Você pode participar? Muito obrigado(a).
                        </p>
                    </div>
                    <br/>

                    <button onClick={onNewSurvey}
                            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Iniciar
                    </button>
                </div>
            )}
        </div>
    );
};

export default SaveStatus;
