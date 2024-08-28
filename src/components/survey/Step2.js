import React from 'react';
import './Step2.css';
import { mayorOptions } from './data';

const Step2 = ({ mayorChoice, setMayorChoice }) => {
    const handleSelect = (nome) => {
        setMayorChoice(nome);
    };

    return (
        <div className="step2">
            <h4>Selecione o candidato para Prefeito</h4>
            <div className="candidate-grid">
                {mayorOptions.map((candidate, index) => (
                    <div
                        key={index}
                        className={`candidate-card ${mayorChoice === candidate.nome ? 'selected' : ''}`}
                        onClick={() => handleSelect(candidate.nome)}
                    >
                        <img src={candidate.imagem} alt={candidate.nome} className="candidate-image" />
                        <div className="candidate-info">
                            <p>{candidate.nome}</p>
                        </div>
                        {candidate.numero && (
                            <div
                                className="candidate-number"
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

export default Step2;