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
        <div className="p-4 bg-zinc-900 min-h-screen text-white">
            <h4 className="text-lg font-semibold mb-4 text-center">Selecione o candidato para Vereador.</h4>
            <input
                type="text"
                placeholder="Procurar por nome ou número"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mb-4 text-black rounded-lg"
            />
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
                            style={{ '--candidate-color': partidoCores[candidate.partido] || '#000000' }}
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
                                    style={{ backgroundColor: partidoCores[candidate.partido] || '#000000' }}
                                >
                                    {candidate.numero}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-2 text-center text-gray-300">
                        Nenhum candidato encontrado para o termo "{searchTerm}".
                    </p>
                )}
            </div>
        </div>
    );
};

export default Step3;