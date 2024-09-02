import React from 'react';
import { mayorOptions } from '../../data';
import {useEffect} from "react";

function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const Step2 = ({ mayorChoice, setMayorChoice }) => {
    useEffect(() => {
        // Scroll to top on component mount
        window.scrollTo(0, 0);
    }, []);

    const handleSelect = (nome) => {
        setMayorChoice(nome);
    };

    return (
        <div className="flex flex-col items-center">
            <p className="text-lg font-sans font-light text-gray-700 dark:text-gray-300 mb-6 ">
                Considerando esses candidatos em <span className='font-medium'>quem você votaria?</span></p>

            <div className="grid grid-cols-2 gap-4">
                {mayorOptions.map((candidate, index) => (
                    <div
                        key={index}
                        className={`relative flex flex-col items-center w-28 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg ${
                            mayorChoice === candidate.nome ? 'shadow-green-700 border-2 border-green-700' : ''
                        }`}
                        onClick={() => handleSelect(candidate.nome)}
                    >
                        <img
                            src={candidate.imagem}
                            alt={candidate.nome}
                            className={`rounded-full w-16 h-16 mb-2 ${
                                mayorChoice === candidate.nome
                                    ? 'shadow-green-300 border-1 border-green-700 bg-green-600'
                                    : 'filter grayscale'
                        }`}
                        />
                        <div className="text-xs font-sans font-medium text-center text-gray-700 dark:text-gray-300">
                            {toTitleCase(candidate.nome)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Step2;
