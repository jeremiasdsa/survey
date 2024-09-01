import React from 'react';
import { mayorOptions } from './data';
import {useEffect} from "react";

function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

const Step22 = ({ aVoidMayorChoice, setAvoidMayorChoice }) => {
    useEffect(() => {
        // Scroll to top on component mount
        window.scrollTo(0, 0);
    }, []);

    const handleSelect = (nome) => {
        setAvoidMayorChoice(nome);
        console.log(nome);
    };

    return (
        <div className="flex flex-col items-center">
                <p className="text-lg font-sans font-light text-gray-700 dark:text-gray-300 mb-6 ">
                    Entre esses candidatos, em quem você<span className='font-medium'> NAO </span>votaria?<span className='font-medium'> Quem NAO merece o seu voto?</span></p>
            <div className="grid grid-cols-2 gap-4">
                {mayorOptions.slice().reverse().map((candidate, index) => (
                    <div
                        key={index}
                        className={`relative flex flex-col items-center w-28 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg ${
                            aVoidMayorChoice === candidate.nome ? 'shadow-red-700 border-2 border-red-700' : ''
                        }`}
                        onClick={() => handleSelect(candidate.nome)}
                    >
                        <img
                            src={candidate.imagem}
                            alt={candidate.nome}
                            className={`rounded-full w-16 h-16 mb-2 ${
                                aVoidMayorChoice === candidate.nome
                                    ? 'shadow-red-300 border-1 border-red-700 bg-red-600'
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

export default Step22;