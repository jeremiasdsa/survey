import React, { useState, useEffect } from 'react';
import { child, ref, set } from "firebase/database";
import { database, fireDb } from "../../firebase"; // Certifique-se que fireDb está configurado
import { openDatabase } from "../../storage";
import { collection, getDocs } from 'firebase/firestore'; // Importar funções do Firestore
import {neighborhoods} from "../../data";

const StatisticsModal = ({ isOpen, onClose, countStoredData, showCloudStatistics }) => {
    const [surveyCount, setSurveyCount] = useState(0);
    const [firestoreSurveyCount, setFirestoreSurveyCount] = useState(0); // Contagem das pesquisas no Firestore
    const [neighborhoodCount, setNeighborhoodCount] = useState({});
    const [localNeighborhoodCount, setLocalNeighborhoodCount] = useState({});
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);


    // Convert array to only use neighborhood names (removing the "goal" property for display purposes)
    // const neighborhoodNames = neighborhoods.map((neighborhood) => neighborhood.name).sort();

    // Fetch total surveys from Firestore
    const fetchFirestoreSurveys = async () => {
        try {
            const querySnapshot = await getDocs(collection(fireDb, "surveys")); // Substitua "surveys" pela sua coleção no Firestore
            setFirestoreSurveyCount(querySnapshot.size); // Quantidade de documentos
        } catch (error) {
            console.error('Erro ao buscar pesquisas no Firestore:', error);
        }
    };

    // Fetch and count surveys by neighborhood
    const fetchSurveysByNeighborhood = async () => {
        try {
            const querySnapshot = await getDocs(collection(fireDb, "surveys"));
            const counts = {};

            querySnapshot.forEach((doc) => {
                const survey = doc.data();
                const bairro = survey.bairro || 'Sem Bairro';

                // Incrementar a contagem para o bairro
                if (counts[bairro]) {
                    counts[bairro] += 1;
                } else {
                    counts[bairro] = 1;
                }
            });

            // Atualizar o estado com a contagem por bairro
            setNeighborhoodCount(counts);
        } catch (error) {
            console.error('Erro ao buscar pesquisas no Firestore:', error);
        }
    };

    const fetchLocalSurveysByNeighborhood = async () => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction("dataStore", "readonly");
            const store = transaction.objectStore("dataStore");
            const unsyncedData = await new Promise((resolve, reject) => {
                const request = store.getAll();
                request.onsuccess = (event) => {
                    resolve(event.target.result || []);
                };
                request.onerror = (event) => {
                    reject(event.target.error);
                };
            });

            const localCounts = {};
            unsyncedData.forEach((survey) => {
                const bairro = survey.bairro || 'Sem Bairro';
                if (localCounts[bairro]) {
                    localCounts[bairro] += 1;
                } else {
                    localCounts[bairro] = 1;
                }
            });

            // Atualizar o estado com a contagem local por bairro
            setLocalNeighborhoodCount(localCounts);
        } catch (error) {
            console.error('Erro ao acessar IndexedDB para buscar pesquisas locais:', error);
        }
    };

    useEffect(() => {
        if (isOpen) {
            // Reset the modal state when it's opened
            setMessage('');
            setSending(false);

            // Fetch the count of surveys from IndexedDB
            countStoredData().then(count => setSurveyCount(count)).catch(err => console.error(err));

            // Fetch the count of surveys from Firestore
            fetchFirestoreSurveys(); // Chama a função para buscar a quantidade de pesquisas no Firestore

            // Fetch surveys by neighborhood
            fetchSurveysByNeighborhood();

            // Fetch surveys by neighborhood from IndexedDB
            fetchLocalSurveysByNeighborhood();
        }
    }, [isOpen, countStoredData]);

    const sendDataToCloud = () => {
        if (!navigator.onLine) {
            setMessage('Sem conexão com a Internet. Por favor, conecte-se e tente novamente.');
            return;
        }
        sendAllDataToCloud();
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setMessage('Dados enviados com sucesso!');
        }, 4000);
    };

    const handleClose = () => {
        setMessage('');
        setSending(false);
        onClose();
    };

    const sendAllDataToCloud = async () => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction("dataStore", "readonly");
            const store = transaction.objectStore("dataStore");
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
                        let lastSynced = Date.now();
                        item.lastSynced = lastSynced;

                        const surveyId = item.id;
                        const newSurveyRef = ref(database, `allSur/${surveyId}`);

                        await set(newSurveyRef, { ...item, id: surveyId });

                        const updateTransaction = db.transaction("dataStore", "readwrite");
                        const updateStore = updateTransaction.objectStore("dataStore");
                        await updateStore.put({ ...item, endSurvey: true, lastSynced: lastSynced, id: item.id });

                        console.log(`Data with ID ${surveyId} synced successfully.`);
                    } catch (syncError) {
                        console.error(`Error syncing data with ID ${item.id}:`, syncError);
                    }
                }
            }
        } catch (err) {
            console.error('Error accessing IndexedDB for syncing:', err);
        }
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
                                        <div
                                            className="loader mt-4 border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-6">


                                    <p className="text-sm font-sans font-medium text-gray-700 dark:text-gray-300 mb2">
                                        Pesquisas Salvas no Celular: {surveyCount}
                                    </p>


                                    {/*{ showCloudStatistics && (*/}
                                        <div>
                                            {/*<p className="text-xs font-sans font-medium text-gray-700 dark:text-gray-300 text-justify">*/}
                                            {/*    Todas as Pesquisas por Bairro Local:*/}
                                            {/*</p>*/}

                                            {/* Usamos um grid com 2 colunas */}
                                            <div className="grid grid-cols-2 gap-0">
                                                {neighborhoods.map(({name, goal}) => (
                                                    <div key={name}
                                                         className="text-xs font-sans font-light text-gray-700 dark:text-gray-300">
                                                        {name}: {localNeighborhoodCount[name] || 0} de {goal}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    {/*)}*/}

                                    {/*{ showCloudStatistics && (*/}
                                    {/*    <div>*/}
                                    {/*        <p className="text-xs font-sans font-medium text-gray-700 dark:text-gray-300 text-justify">*/}
                                    {/*            Todas as Pesquisas por Bairro Salvos na Nuvem:*/}
                                    {/*        </p>*/}

                                    {/*        /!* Usamos um grid com 2 colunas *!/*/}
                                    {/*        <div className="grid grid-cols-2 gap-0">*/}
                                    {/*            {neighborhoods.map(({name, goal}) => (*/}
                                    {/*                <div key={name}*/}
                                    {/*                     className="text-xs font-sans font-light text-gray-700 dark:text-gray-300">*/}
                                    {/*                    {name}: {neighborhoodCount[name] || 0} de {goal}*/}
                                    {/*                </div>*/}
                                    {/*            ))}*/}
                                    {/*        </div>*/}
                                    {/*        <p className="text-sm font-sans font-medium text-gray-700 dark:text-gray-300 mb-6">*/}
                                    {/*            Total de todas as Pesquisas Realizadas: {firestoreSurveyCount}*/}
                                    {/*        </p>*/}
                                    {/*    </div>*/}
                                    {/*)}*/}

                                    <div className="flex justify-between mt-2">
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