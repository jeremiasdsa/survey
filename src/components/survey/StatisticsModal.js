import React, { useState, useEffect } from 'react';
import {child, ref, set} from "firebase/database";
import {database} from "../../firebase";
import {openDatabase} from "../../storage";

const StatisticsModal = ({ isOpen, onClose, countStoredData }) => {
    const [surveyCount, setSurveyCount] = useState(0);
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);


    useEffect(() => {
        if (isOpen) {
            // Reset the modal state when it's opened
            setMessage('');
            setSending(false);
            // Fetch the count of surveys
            countStoredData().then(count => setSurveyCount(count)).catch(err => console.error(err));
        }
    }, [isOpen, countStoredData]);

    const sendDataToCloud = () => {
        if (!navigator.onLine) {
            setMessage('Sem conexão com a Internet. Por favor, conecte-se e tente novamente.');
            return;
        }
        sendAllDataToCloud();
        setSending(true);
        // Simulate sending data to the cloud
        setTimeout(() => {
            setSending(false);
            setMessage('Dados enviados com sucesso!');
        }, 4000); // Simulate 3 seconds delay for sending data
    };

    // Close the modal and reset state
    const handleClose = () => {
        setMessage('');
        setSending(false);
        onClose();
    };

    const sendAllDataToCloud = async () => {
        let allSurveysID = "allSurveysID"

        try {
            const db = await openDatabase();
            const transaction = db.transaction("dataStore", "readonly");
            const store = transaction.objectStore("dataStore");

            // Get all data from IndexedDB
            const unsyncedData = await new Promise((resolve, reject) => {
                const request = store.getAll();
                request.onsuccess = (event) => {
                    resolve(event.target.result || []);
                };
                request.onerror = (event) => {
                    reject(event.target.error);
                };
            });

            for (const item of unsyncedData) {
                if (!item.endSurvey) {
                    try {

                        //Criando o lastSynced
                        let lastSynced = Date.now();
                        item.lastSynced = lastSynced;

                        // Try syncing each unsynced item to Firebase
                        const surveyId = item.id;
                        // const newSurveyRef = ref(database, `surveys/${surveyId}`);
                        const newSurveyRef = ref(database, `allSur/${surveyId}`);

                        await set(newSurveyRef, {...item, id: surveyId});
                        // CONVERSAR COM JORDAO .. AQUI DEVERIA SER AWAIT OU TERM O THEN?

                        // Mark the item as synced in IndexedDB
                        const updateTransaction = db.transaction("dataStore", "readwrite");
                        const updateStore = updateTransaction.objectStore("dataStore");
                        await updateStore.put({...item, endSurvey: true, lastSynced: lastSynced, id: item.id });

                        console.log(`Data with ID ${surveyId} synced successfully.`);
                    } catch (syncError) {
                        console.error(`Error syncing data with ID ${item.id}:`, syncError);
                    }
                }
            }
        } catch (err) {
            console.error('Error accessing IndexedDB for syncing:', err);
        }


        // const nodeRef = child(ref(database), "allSur/" + allSurveysID); // surveyId = custom ID you want to specify
        //
        // // Save to Realtime using Set to create or / UPDATE an item
        // set(nodeRef, {...newSurvey})
        //     .then(async () => {
        //         console.log('Dados salvos no Realtime com SET.');
        //         await updateIndexDBLocally({...newSurvey, id: surveyId}, true);
        //     })
        //     .catch((err) => {
        //         console.error('realtime - Error Realtime com SET', err);
        //     });
    }

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-black opacity-50"></div>

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div
                    className="bg-white mr-safe-offset-1 ml-safe-offset-1 dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full relative z-10">
                    <h2 className="text-xl font-semibold text-center mb-4 dark:text-white">Estatísticas do Sistema</h2>

                    {message ? (
                        <div className="text-center">
                            <p className="text-sm font-sans font-medium text-gray-700 dark:text-gray-300 mb-6">
                                {message}
                            </p>
                            {!sending && (
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    onClick={handleClose}
                                >
                                    Fechar
                                </button>
                            )}
                        </div>
                    ) : (
                        <div>
                            {sending ? (
                                <div className="flex items-center justify-center">
                                    <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        Salvando...
                                        {/* Spinner */}
                                        <div
                                            className="loader mt-4 border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-6">
                                    <p className="text-sm font-sans font-medium text-gray-700 dark:text-gray-300 mb-6">
                                        Pesquisas Realizadas: {surveyCount}
                                    </p>
                                    <p className="text-sm font-sans font-medium text-gray-700 dark:text-gray-300 mb-6">
                                        Quantidade de Pesquisas por
                                        Bairro: {/* Add logic for counting by neighborhood */}
                                    </p>

                                    <div className="flex justify-between">
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                            onClick={handleClose}
                                        >
                                            Sair
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                            onClick={sendDataToCloud}
                                            disabled={sending}
                                        >
                                            Enviar Dados
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatisticsModal;