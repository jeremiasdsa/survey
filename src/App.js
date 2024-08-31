import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import SurveyForm from './components/survey/SurveyForm';
import SyncStatus from './components/SyncStatus';
import { database } from "./firebase";
import { openDatabase } from "./storage";
import { ref, push } from 'firebase/database';
import HeaderBar from './components/HeaderBar';
import './index.css';
import SaveStatus from "./components/survey/SaveStatus"; // Importa o Tailwind CSS

// Função para sincronizar dados do IndexedDB com o Firebase
function syncDataWithFirebase() {
  openDatabase().then(db => {
    const transaction = db.transaction("dataStore", "readonly");
    const store = transaction.objectStore("dataStore");

    const allData = store.getAll();
    allData.onsuccess = function() {
      allData.result.forEach(data => {
        if(!data.synced) {
          push(ref(database, 'surveys'), data).catch(error => {
            console.error("Erro ao sincronizar com o Firebase:", error);
          });
        }
      });

      // Limpar os dados da IndexedDB após a sincronização
      // const clearTransaction = db.transaction("dataStore", "readwrite");
      // const clearStore = clearTransaction.objectStore("dataStore");
      // clearStore.clear();
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
  const [theme, setTheme] = useState('light');

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

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
      <div className={theme+" dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-600 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400"}>
        <HeaderBar toggleTheme={toggleTheme}/>
          {researcherName ? (
              <div className='mx-auto max-w-screen-md min-h-screen pt-14 pb-14 px-safe sm:pb-0 dark:hover:text-zinc-50'>
                <SurveyForm researcherName={researcherName} theme={theme}/>
                {/*<SyncStatus/>*/}
              </div>
          ) : (
              <Login onLogin={handleLogin} theme={theme}/>
          )}
      </div>
  );
}

export default App;
