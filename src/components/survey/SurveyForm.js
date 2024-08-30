import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { setDoc, doc } from 'firebase/firestore';
import { database, fireDb } from "../../firebase";
import { openDatabase } from '../../storage';
import './SurveyForm.css';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Review from './Review';
import ActionsBar from "../ActionsBar";

const updateDataLocally = async (data, synced) => {
    try {
        const db = await openDatabase();
        const transaction = db.transaction("dataStore", "readwrite");
        const store = transaction.objectStore("dataStore");
        store.put({ ...data, synced });
        console.log('Dados salvos localmente no IndexedDB.');
    } catch (err) {
        console.error('[updateDataLocally]', err);
    }
}

const SurveyForm = ({ researcherName, theme }) => {
    const [step, setStep] = useState(1);
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [mayorChoice, setMayorChoice] = useState('');
    const [councilorChoice, setCouncilorChoice] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isError, setIsError] = useState(false);

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
        if (step === 3 && !councilorChoice) {
            setFeedbackMessage('Por favor, selecione um candidato a vereador.');
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

    const handleConfirm = async () => {
        try {
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

            // Tentar salvar no Firebase Realtime Database
            push(ref(database, 'surveys'), newSurvey)
                .then(async () => {
                    console.log('Dados salvos no Realtime.');
                    // Atualizar o status de sincronização localmente
                    await updateDataLocally(newSurvey, true);
                })
                .catch((err) => {
                    console.error('realtime - error', err);
                });

            // Salvar no Firestore
            setDoc(doc(fireDb, `surveys/${newSurvey.id}`), newSurvey)
                .then(() => {
                    console.log('Dados salvos no Firestore.');
                })
                .catch((err) => {
                    console.log('firestore - error', err);
                });

            console.log("Dados salvos no Firestore.");

            setFeedbackMessage(`${navigator.onLine ? 'Dados salvos na nuvem' : 'Dados salvos localmente para posterior sincronização'}`);
            setIsError(false);

            // Redirecionar para iniciar uma nova pesquisa
            resetForm();
        } catch (err) {
            console.error("Erro ao salvar os dados:", err);
            setFeedbackMessage('Erro ao salvar no Firebase. Os dados serão sincronizados automaticamente quando a conexão for restabelecida.'); //TODO think on a better message
            setIsError(true);
            resetForm();
        }
    };

    const resetForm = () => {
        setNeighborhood('');
        setStreet('');
        setMayorChoice('');
        setCouncilorChoice('');
        setStep(1);
    };

    return (
        <div className={`survey-form ${theme}`}>
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

            {step === 4 && (
                <Review
                    neighborhood={neighborhood}
                    street={street}
                    mayorChoice={mayorChoice}
                    councilorChoice={councilorChoice}
                    onConfirm={handleConfirm}
                    onEdit={handlePrevious}
                />
            )}

            <ActionsBar next={handleNext} prev={handlePrevious} step={step}/>

            {feedbackMessage && (
                <p className={`feedback-message ${isError ? 'error' : 'success'}`} aria-live="assertive">
                    {feedbackMessage}
                </p>
            )}
        </div>
    );
};

export default SurveyForm;
