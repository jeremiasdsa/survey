import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { database } from "../../firebase";
import './SurveyForm.css';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("offlineDataDB", 1);

        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("dataStore")) {
                db.createObjectStore("dataStore", { autoIncrement: true });
                console.log("Object store 'dataStore' criada com sucesso.");
            }
        };

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject(event.target.errorCode);
        };
    });
}

function saveDataLocally(data) {
    openDatabase().then(db => {
        const transaction = db.transaction("dataStore", "readwrite");
        const store = transaction.objectStore("dataStore");
        store.add(data);
        console.log("Dados salvos localmente no IndexedDB.");
    }).catch(error => {
        console.error("Erro ao abrir o IndexedDB:", error);
    });
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

    const handleSave = () => {
        if (!councilorChoice) {
            setFeedbackMessage('Por favor, selecione um candidato a vereador.');
            setIsError(true);
            return;
        }

        const newSurvey = {
            researcher: researcherName,
            neighborhood,
            street,
            mayorChoice,
            councilorChoice,
            timestamp: Date.now(),
        };

        // Salvar localmente no IndexedDB
        saveDataLocally(newSurvey);

        // Tentar salvar no Firebase (sincronizado automaticamente quando a conexão for restabelecida)
        push(ref(database, 'surveys'), newSurvey)
            .then(() => {
                setFeedbackMessage('Dados salvos com sucesso no Firebase.');
                setIsError(false);
            })
            .catch(error => {
                setFeedbackMessage('Erro ao salvar no Firebase. Os dados serão sincronizados automaticamente quando a conexão for restabelecida.');
                setIsError(true);
                console.error("Erro ao salvar no Firebase:", error);
            });
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
                {step > 1 && <button onClick={handlePrevious}>Anterior</button>}
                {step < 3 && <button onClick={handleNext}>Próximo</button>}
                {step === 3 && <button onClick={handleSave}>Salvar</button>}
            </div>

            {feedbackMessage && (
                <p className={`feedback-message ${isError ? 'error' : 'success'}`}>
                    {feedbackMessage}
                </p>
            )}
        </div>
    );
};

export default SurveyForm;