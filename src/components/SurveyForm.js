import React, { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { database } from "../firebase";

const SurveyForm = ({ researcherName }) => {
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [mayorChoice, setMayorChoice] = useState('');
    const [councilorChoice, setCouncilorChoice] = useState('');

    // Reference a specific document (by ID) in a collection
    const handleSave = async () => {
        try {
            await setDoc(doc(database, `/surveys/${crypto.randomUUID()}`), {
                researcher: researcherName,
                neighborhood,
                street,
                mayorChoice,
                councilorChoice,
                timestamp: Date.now(),
            });
            console.log("Document successfully written!");
        } catch (err) {
            console.error("Error writing document: ", err);
        }
    };

    return (
        <div>
            <h3>Pesquisa por {researcherName}</h3>
            <div>
                <input
                    type="text"
                    placeholder="Bairro"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Rua"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />
            </div>
            <div>
                <h4>Prefeito</h4>
                <input
                    type="radio"
                    name="mayor"
                    value="Gledes"
                    onChange={(e) => setMayorChoice(e.target.value)}
                /> Gledes
                <input
                    type="radio"
                    name="mayor"
                    value="Cláudio"
                    onChange={(e) => setMayorChoice(e.target.value)}
                /> Cláudio
                {/* Outros candidatos */}
            </div>
            <div>
                <h4>Vereador</h4>
                <input
                    type="radio"
                    name="councilor"
                    value="Isaac Coelhinho"
                    onChange={(e) => setCouncilorChoice(e.target.value)}
                /> Isaac Coelhinho
                <input
                    type="radio"
                    name="councilor"
                    value="Nando"
                    onChange={(e) => setCouncilorChoice(e.target.value)}
                /> Nando
                {/* Outros candidatos */}
            </div>
            <button onClick={handleSave}>Salvar</button>
        </div>
    );
};

export default SurveyForm;
