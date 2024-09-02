import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { setDoc, doc } from 'firebase/firestore';
import { database, fireDb } from "../../firebase";
import { openDatabase } from '../../storage';
import Step1 from './Step1';
import Step2 from './Step2';
import Step22 from './Step22';
import Step3 from './Step3';
import Review from './Review';
import ActionsBar from "../ActionsBar";
import SaveStatus from './SaveStatus'; // Importa o novo componente
import Alert from './Alert'; // Import the new Alert component

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

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const SurveyForm = ({ researcherName }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [showSaveStatus, setShowSaveStatus] = useState(false); // Estado para exibir o status de salvamento

    const handleNext = () => {
        let requiredFields = [];

        // Defina os campos obrigatórios com base na etapa atual
        if (step === 1) {
            requiredFields = ['bairro', 'genero', 'faixaEtaria', 'escolaridade', 'rendaFamiliar'];
        } else if (step === 2) {
            requiredFields = ['bairro', 'genero', 'faixaEtaria', 'escolaridade', 'rendaFamiliar', 'mayorChoice'];
        } else if (step === 3) {
            requiredFields = ['bairro', 'genero', 'faixaEtaria', 'escolaridade', 'rendaFamiliar', 'mayorChoice', 'aVoidMayorChoice'];
        } else if (step === 4) {
            requiredFields = ['bairro', 'genero', 'faixaEtaria', 'escolaridade', 'rendaFamiliar', 'mayorChoice', 'aVoidMayorChoice', 'councilorChoice'];
        }

        // Verificar se todos os campos obrigatórios estão preenchidos
        const allFieldsFilled = requiredFields.every(fieldId => {
            return formData[fieldId] !== undefined && formData[fieldId] !== '';
        });

        if (!allFieldsFilled) {
            setFeedbackMessage('Por favor, preencha todos os campos obrigatórios.');
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
                // id: crypto.randomUUID(),
                id: generateUUID(),
                researcher: researcherName,
                ...formData,
                timestamp: Date.now(),
            };

            // Save locally in IndexedDB
            await updateDataLocally(newSurvey, false);

            // Save to Firebase Realtime Database
            push(ref(database, 'surveys'), newSurvey)
                .then(async () => {
                    console.log('Dados salvos no Realtime.');
                    await updateDataLocally(newSurvey, true); // Update sync status
                })
                .catch((err) => {
                    console.error('realtime - error', err);
                });

            // Save to Firestore
            setDoc(doc(fireDb, `surveys/${newSurvey.id}`), newSurvey)
                .then(() => {
                    console.log('Dados salvos no Firestore.');
                })
                .catch((err) => {
                    console.log('firestore - error', err);
                });

            //Commentei essa linha para não exibir mensagem de salvos com sucesso no final da pesquisa
            //setFeedbackMessage(`${navigator.onLine ? 'Dados salvos na nuvem' : 'Dados salvos localmente para posterior sincronização'}`);
            setIsError(false);

            // // Redirect to start a new survey
            // resetForm();
            // Exibir status de salvamento
            setShowSaveStatus(true);
        } catch (err) {
            console.error("Erro ao salvar os dados:", err);
            setFeedbackMessage('Erro ao salvar no Firebase. Os dados serão sincronizados automaticamente quando a conexão for restabelecida.');
            setIsError(true);
            resetForm();
        }
    };

    const resetForm = () => {
        setFormData({});
        setStep(1);
        setShowSaveStatus(false); // Reinicia o estado de salvamento
    };

    return (
        <div>
            {feedbackMessage && (
                <Alert message={feedbackMessage} type={isError ? 'error' : 'success'} />
            )}
            {showSaveStatus ? (
                <SaveStatus onNewSurvey={resetForm} />
            ) : (
                <>
                    {step === 1 && (
                        <Step1
                            formData={formData}
                            setFormData={setFormData}
                            isError={isError}
                        />
                    )}

                    {step === 2 && (
                        <Step2
                            mayorChoice={formData.mayorChoice}
                            setMayorChoice={(value) => setFormData({ ...formData, mayorChoice: value })}
                            isError={isError}
                        />
                    )}

                    {step === 3 && (
                        <Step22
                            aVoidMayorChoice={formData.aVoidMayorChoice}
                            setAvoidMayorChoice={(value) => setFormData({ ...formData, aVoidMayorChoice: value })}
                            isError={isError}
                        />
                    )}

                    {step === 4 && (
                        <Step3
                            councilorChoice={formData.councilorChoice}
                            setCouncilorChoice={(value) => setFormData({ ...formData, councilorChoice: value })}
                            isError={isError}
                        />
                    )}

                    {step === 5 && (
                        <Review
                            formData={formData}
                            onConfirm={handleConfirm}
                            onEdit={handlePrevious}
                        />
                    )}

                    <ActionsBar next={handleNext} prev={handlePrevious} save={handleConfirm} step={step} maxSteps={5} />


                </>
            )}
        </div>
    );
};


export default SurveyForm;
