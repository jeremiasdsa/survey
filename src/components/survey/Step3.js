import React from 'react';
import { councilorOptions } from './data';

const Step3 = ({ councilorChoice, setCouncilorChoice, isError }) => {
    return (
        <div>
            <h4>Vereador</h4>
            {councilorOptions.map((candidate, index) => (
                <div key={index}>
                    <input
                        type="radio"
                        name="councilor"
                        value={candidate.nome}
                        onChange={(e) => setCouncilorChoice(e.target.value)}
                        checked={councilorChoice === candidate.nome}
                    /> {candidate.nome} - {candidate.partido} ({candidate.numero})
                </div>
            ))}
        </div>
    );
};

export default Step3;