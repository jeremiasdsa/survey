import React, { useState, useEffect } from 'react';
import Login from './components/login/Login';
import SurveyForm from './components/survey/SurveyForm';
import SyncStatus from './components/SyncStatus';
import { database } from "./firebase";
import { ref, push } from 'firebase/database';


// Função para abrir o banco de dados e garantir que a object store seja criada
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

// Função para sincronizar dados do IndexedDB com o Firebase
function syncDataWithFirebase() {
  openDatabase().then(db => {
    const transaction = db.transaction("dataStore", "readonly");
    const store = transaction.objectStore("dataStore");

    const allData = store.getAll();
    allData.onsuccess = function() {
      allData.result.forEach(data => {
        push(ref(database, 'surveys'), data).catch(error => {
          console.error("Erro ao sincronizar com o Firebase:", error);
        });
      });

      // Limpar os dados da IndexedDB após a sincronização
      const clearTransaction = db.transaction("dataStore", "readwrite");
      const clearStore = clearTransaction.objectStore("dataStore");
      clearStore.clear();
      console.log("Dados sincronizados e IndexedDB limpo.");
    };

    allData.onerror = function(event) {
      console.error("Erro ao recuperar dados da IndexedDB:", event.target.errorCode);
    };
  }).catch(error => {
    console.error("Erro ao abrir o IndexedDB:", error);
  });
}

function App() {
  const [researcherName, setResearcherName] = useState('');

  // Sincronizar dados ao carregar o aplicativo se estiver online
  useEffect(() => {
    if (navigator.onLine) {
      syncDataWithFirebase();
    } else {
      console.log("Dispositivo offline, sincronização adiada.");
    }

    // Adicionar um listener para tentar sincronizar quando a conexão for restabelecida
    const handleOnline = () => {
      console.log("Conexão restabelecida, tentando sincronizar...");
      syncDataWithFirebase();
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  const handleLogin = (name, pin) => {
    // Validação de PIN pode ser adicionada aqui
    setResearcherName(name);
  };

  return (
      <div>
        {researcherName ? (
            <>
              <SurveyForm researcherName={researcherName} />
              <SyncStatus />
            </>
        ) : (
            <Login onLogin={handleLogin} />
        )}
      </div>
  );
}

export default App;