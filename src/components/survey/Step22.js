import React from 'react';
import { mayorOptions } from './data';

function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const Step22 = ({ aVoidMayorChoice, setAvoidMayorChoice }) => {
    const handleSelect = (nome) => {
        setAvoidMayorChoice(nome);
        console.log(nome);
    };

    return (
        <div className="flex flex-col items-center">
            <h4 className="text-xl font-semibold mb-4">Considerando esses candidatos em quem você NAO votaria? (ESTIMULADA)</h4>
            <div className="grid grid-cols-2 gap-4">
                {mayorOptions.map((candidate, index) => (
                    <div
                        key={index}
                        className={`relative flex flex-col items-center p-2 rounded-lg shadow-lg cursor-pointer ${
                            aVoidMayorChoice === candidate.nome ? 'border-4 border-red-700' : ''
                        }`}
                        onClick={() => handleSelect(candidate.nome)}
                    >
                        <img
                            src={candidate.imagem}
                            alt={candidate.nome}
                            className="rounded-full w-14 h-14 mb-2"
                        />
                        <div className="text-center text-sm font-medium">
                            {toTitleCase(candidate.nome)}
                        </div>
                        {candidate.numero && (

                            <div
                                className="absolute bottom-14 right-5 bg-red-500 text-white rounded-full px-2 py-1"
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

export default Step22;