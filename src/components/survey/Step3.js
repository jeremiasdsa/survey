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

const Step3 = ({ councilorChoice, setCouncilorChoice }) => {
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
            <input
                type="text"
                placeholder="Procurar por nome ou número"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <div className="candidate-vereador-grid">
                {filteredCandidates.length > 0 ? (
                    filteredCandidates.map((candidate, index) => (
                        <div
                            key={index}
                            className={`candidate-vereador-card ${councilorChoice === candidate.nome ? 'selected' : ''}`}
                            onClick={() => handleSelect(candidate.nome)}
                            style={{ '--candidate-color': partidoCores[candidate.partido] || '#000000' }}
                        >
                            <div className="quadrant quadrant-1">
                                <img src={candidate.image} alt={candidate.nome} className="candidate-vereador-image" />
                            </div>
                            <div className="quadrant quadrant-2">
                                <p className="candidate-vereador-name">{toTitleCase(candidate.nome)}</p>
                                {candidate.numero && (
                                    <div className="quadrant quadrant-4b">
                                        <div className="candidate-vereador-number">
                                            {candidate.numero}
                                        </div>
                                    </div>
                                )}
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