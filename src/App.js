import React, { useState, useEffect } from 'react';
import Login from './components/login/Login';
import SurveyForm from './components/survey/SurveyForm';
import SyncStatus from './components/SyncStatus';
import { database } from "./firebase";
import { openDatabase } from "./storage";
import { ref, push } from 'firebase/database';
import HeaderBar from './components/HeaderBar';
import TabBar from './components/TabBar';
import './index.css'; // Importa o Tailwind CSS

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
      <div className="app">
        <HeaderBar/>
        <main
            /**
             * Padding top = `appbar` height
             * Padding bottom = `bottom-nav` height
             */
            className='mx-auto max-w-screen-md pt-20 pb-16 px-safe sm:pb-0'
        >
          <div className="p-6">
            {researcherName ? (
                <>
                  <SurveyForm researcherName={researcherName}/>
                  <SyncStatus/>
                </>
            ) : (
                <Login onLogin={handleLogin}/>
            )}
          </div>
        </main>
        <TabBar/>
      </div>


      // <div className="app">
      //   <HeaderBar />
      //   <div className="content">
      //     {researcherName ? (
      //         <>
      //           <SurveyForm researcherName={researcherName} />
      //           <SyncStatus />
      //         </>
      //     ) : (
      //         <Login onLogin={handleLogin} />
      //     )}
      //   </div>
      //   <TabBar />
      // </div>
  );
}

export default App;