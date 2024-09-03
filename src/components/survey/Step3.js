import React, {useState, useEffect } from 'react';
import { councilorOptions } from '../../data';

// Função para converter o texto para Title Case
function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const Step3 = ({ councilorChoice, setCouncilorChoice, onPrevious, onNext }) => {
    useEffect(() => {
        // Scroll to top on component mount
        window.scrollTo(0, 0);
    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    const handleSelect = (nome) => {
        setCouncilorChoice(nome);
    };

    // Filtra candidatos pelo nome ou número
    const filteredCandidates = councilorOptions.filter(candidate =>
        candidate.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.numero.toString().includes(searchTerm)
    );

    return (
        <div className="min-h-screen pb-20">

            <p className="text-lg font-sans font-light text-gray-700 dark:text-gray-300 mb-6 ">
                Considerando esses candidatos para Vereador, <span className='font-medium'>em quem você votaria?</span></p>

            <form className="max-w-md mx-auto pb-3">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>

                    <input onChange={(e) => setSearchTerm(e.target.value)}
                           type="text"
                           id="default-search-candidate"
                           value={searchTerm}
                           className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Procurar por nome ou número"/>
                </div>
            </form>
            <div className="grid grid-cols-4 md:grid-cols5 gap-0.5">
                {filteredCandidates.length > 0 ? (
                    filteredCandidates.map((candidate, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col items-center"
                            // className={`relative flex flex-col items-center rounded-lg shadow-lg ${
                            //     councilorChoice === candidate.nome
                            //         ? 'ring-2 ring-green-500'
                            //         : 'ring-1 ring-gray-500 hover:ring-green-300'
                            // }`}
                            onClick={() => handleSelect(candidate.nome)}
                            // style={{'--candidate-color': partidoCores[candidate.partido] || '#000000'}}
                        >

                            <div className="">
                                <img
                                    src={candidate.image}
                                    alt={candidate.nome}
                                    className={`rounded-full w-16 h-16 mb-0 ${
                                        councilorChoice === candidate.nome
                                            ? 'shadow-sm shadow-green-700 border-2 border-green-700 bg-green-600'
                                            : 'filter grayscale'
                                    }`}
                                    style={{borderRadius: '50%'}}
                                />

                            </div>

                            <div
                                className={`text-center items-center text-xs font-sans font-semibold mb-1 ${
                                    councilorChoice === candidate.nome
                                        ? 'text-green-600'
                                        : 'text-gray-900 dark:text-gray-300'
                                }`}
                            >
                                {toTitleCase(candidate.nome)}
                            </div>
                            {/*<div*/}
                            {/*    className="w-12 text-xs font-sans font-medium  text-gray-700 dark:text-gray-300 px-0 py-0 rounded-full"*/}
                            {/*>*/}
                            {/*    {candidate.numero}*/}
                            {/*</div>*/}


                        </div>
                    ))
                ) : (
                    <p className="col-span-4 text-lg font-sans text-gray-600 dark:text-red-500-300 ml-8 mb-6 ">
                        Nenhum candidato encontrado para o termo "{searchTerm}".
                    </p>
                )}
            </div>
        </div>
    );
};

export default Step3;
