import React, { useState } from 'react';
import './Step3.css';
import { councilorOptions } from './data';

const Step3 = ({ councilorChoice, setCouncilorChoice }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSelect = (nome) => {
        setCouncilorChoice(nome);
    };

    const filteredCandidates = councilorOptions.filter(candidate =>
        candidate.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="step3">
            <h4>Selecione o candidato para Vereador.</h4>
            <input
                type="text"
                placeholder="Procurar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            <div className="candidate-vereador-grid">
                {filteredCandidates.map((candidate, index) => (
                    <div
                        key={index}
                        className={`candidate-vereador-card ${councilorChoice === candidate.nome ? 'selected' : ''}`}
                        onClick={() => handleSelect(candidate.nome)}
                    >
                        <img src={candidate.image} alt={candidate.nome} className="candidate-vereador-image" />
                        <div className="candidate-vereador-info">
                            <p>{candidate.nome}</p>
                        </div>
                        {candidate.numero && (
                            <div
                                className="candidate-vereador-number"
                                style={{ backgroundColor: candidate.cor }}
                            >
                                {candidate.numero}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Step3;