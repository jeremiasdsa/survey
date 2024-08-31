import React, { useState } from 'react';
import './Step3.css';
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
        <div className="step3">
            <h4>Selecione o candidato para Vereador.</h4>

            <form className="max-w-md mx-auto">
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
                           className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Procurar por nome ou número"/>
                </div>
            </form>


            <div className="candidate-vereador-grid">
                {filteredCandidates.length > 0 ? (
                    filteredCandidates.map((candidate, index) => (
                        <div
                            key={index}
                            className={`candidate-vereador-card ${councilorChoice === candidate.nome ? 'selected' : ''}`}
                            onClick={() => handleSelect(candidate.nome)}
                            style={{'--candidate-color': partidoCores[candidate.partido] || '#000000'}}
                        >
                            <div className="quadrant-1">
                                <img src={candidate.image} alt={candidate.nome}
                                     className="candidate-vereador-image"/>
                            </div>
                            <div className="candidate-vereador-content">
                                <div className="candidate-vereador-name">{toTitleCase(candidate.nome)}</div>
                                <div className="quadrant-4b">
                                    <div className="candidate-vereador-number">
                                        {candidate.numero}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-candidate-message">Nenhum candidato encontrado para o termo "{searchTerm}".</p>
                )}
            </div>
        </div>
    );
};

export default Step3;
