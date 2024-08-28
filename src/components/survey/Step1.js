import React from 'react';
import './Step1.css';

const Step1 = ({ neighborhood, setNeighborhood, street, setStreet, isError }) => {
    return (
        <div className="step1">
            <h4>Informações da Localização</h4>
            <input
                type="text"
                placeholder="Nome do Bairro"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className={isError && !neighborhood ? 'error' : ''}
            />
            <input
                type="text"
                placeholder="Nome da Rua"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className={isError && !street ? 'error' : ''}
            />
        </div>
    );
};

export default Step1;