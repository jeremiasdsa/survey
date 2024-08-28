import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { setDoc, doc } from 'firebase/firestore';
import {database, fireDb} from "../../firebase";
import {openDatabase} from '../../storage'
import './SurveyForm.css';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const updateDataLocally = async (data, synced) => {
    const db = await openDatabase();
    const transaction = db.transaction("dataStore", "readwrite");
    const store = transaction.objectStore("dataStore");
    store.put({...data, synced});
    console.log("Dados salvos localmente no IndexedDB.");
}

const SurveyForm = ({ researcherName }) => {
    const [step, setStep] = useState(1);
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [mayorChoice, setMayorChoice] = useState('');
    const [councilorChoice, setCouncilorChoice] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [theme, setTheme] = useState('light');

    const handleNext = () => {
        if (step === 1 && (!neighborhood || !street)) {
            setFeedbackMessage('Por favor, preencha o Bairro e a Rua.');
            setIsError(true);
            return;
        }
        if (step === 2 && !mayorChoice) {
            setFeedbackMessage('Por favor, selecione um candidato a prefeito.');
            setIsError(true);
            return;
        }
        setIsError(false);
        setFeedbackMessage('');
        setStep(step + 1);
    };

    const handlePrevious = () => {
        setStep(step - 1);
        setIsError(false);
        setFeedbackMessage('');
    };

    const handleSave = async () => {
        try {
            if (!councilorChoice) {
                setFeedbackMessage('Por favor, selecione um candidato a vereador.');
                setIsError(true);
                return;
            }

            const newSurvey = {
                id: crypto.randomUUID(),
                researcher: researcherName,
                neighborhood,
                street,
                mayorChoice,
                councilorChoice,
                timestamp: Date.now(),
            };

            // Salvar localmente no IndexedDB
            await updateDataLocally(newSurvey, false);
            // Tentar salvar no Firebase (sincronizado automaticamente quando a conexão for restabelecida)
            await push(ref(database, 'surveys'), newSurvey);
            await updateDataLocally(newSurvey, true);
            setFeedbackMessage('Dados salvos com sucesso no Firebase.');
            setIsError(false);

            await setDoc(doc(fireDb, `/surveys/${newSurvey.id}`), newSurvey);
            console.log("Document successfully written!");
        } catch (err) {
            console.error("Error writing document: ", err);

            setFeedbackMessage('Erro ao salvar no Firebase. Os dados serão sincronizados automaticamente quando a conexão for restabelecida.');
            setIsError(true);
            console.error("Erro ao salvar no Firebase:", err);
        }
    };

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <div className={`survey-form ${theme}`}>
            <div className="theme-toggle">
                <button onClick={toggleTheme}>
                    {theme === 'light' ? 'Tema Escuro' : 'Tema Claro'}
                </button>
            </div>

            {step === 1 && (
                <Step1
                    neighborhood={neighborhood}
                    setNeighborhood={setNeighborhood}
                    street={street}
                    setStreet={setStreet}
                    isError={isError}
                />
            )}

            {step === 2 && (
                <Step2
                    mayorChoice={mayorChoice}
                    setMayorChoice={setMayorChoice}
                    isError={isError}
                />
            )}

            {step === 3 && (
                <Step3
                    councilorChoice={councilorChoice}
                    setCouncilorChoice={setCouncilorChoice}
                    isError={isError}
                />
            )}

            <div className="button-group">
                {step > 1 && <button onClick={handlePrevious} aria-label="Voltar para o passo anterior">Anterior</button>}
                {step < 3 && <button onClick={handleNext} aria-label="Ir para o próximo passo">Próximo</button>}
                {step === 3 && <button onClick={handleSave} aria-label="Salvar a pesquisa">Salvar</button>}
            </div>

            {feedbackMessage && (
                <p className={`feedback-message ${isError ? 'error' : 'success'}`} aria-live="assertive">
                    {feedbackMessage}
                </p>
            )}
        </div>
    );
};

export default SurveyForm;