import React, { useState } from 'react';
import { councilorOptions } from './data';
import { partidoCores } from './data';

// Função para converter o texto para Title Case
function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const Step3 = ({ councilorChoice, setCouncilorChoice, onPrevious, onNext }) => {
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
        <div className="min-h-screen">
            <h4 className="text-lg font-semibold mb-4 text-center">Selecione o candidato para Vereador.</h4>
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
            <div className="grid grid-cols-3 gap-4">
                {filteredCandidates.length > 0 ? (
                    filteredCandidates.map((candidate, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg cursor-pointer transition-all ${
                                councilorChoice === candidate.nome
                                    ? 'ring-4 ring-green-500'
                                    : 'ring-2 ring-gray-500 hover:ring-green-300'
                            }`}
                            onClick={() => handleSelect(candidate.nome)}
                            style={{'--candidate-color': partidoCores[candidate.partido] || '#000000'}}
                        >
                            <div className="flex items-center justify-center mb-2">
                                <img
                                    src={candidate.image}
                                    alt={candidate.nome}
                                    className="w-12 h-12 rounded-full"
                                />
                            </div>
                            <div className="text-center">
                                <div className="text-sm font-medium mb-1">{toTitleCase(candidate.nome)}</div>
                                <div
                                    className="text-white text-xs px-2 py-1 rounded-full"
                                    style={{backgroundColor: partidoCores[candidate.partido] || '#000000'}}
                                >
                                    {candidate.numero}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-2 text-center">
                        Nenhum candidato encontrado para o termo "{searchTerm}".
                    </p>
                )}
            </div>
        </div>
    );
};

export default Step3;
