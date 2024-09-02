import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import SurveyForm from './components/survey/SurveyForm';
import { database } from "./firebase";
import { openDatabase } from "./storage";
import { ref, push } from 'firebase/database';
import HeaderBar from './components/HeaderBar';
import './index.css';
import Spinner from "./components/Spinner";

// Função para sincronizar dados do IndexedDB com o Firebase
const syncDataWithFirebase = async () => {
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
      console.log("NAO ESTOU LIMPANDO -- Realtime está poluindo mais por causa disso!??")
      console.log("Dados sincronizados e IndexedDB limpo.");
    };

    allData.onerror = function(event) {
      console.error("Erro ao recuperar dados da IndexedDB:", event.target.errorCode);
    };
  }).catch(error => {
    console.error("Erro ao abrir o IndexedDB:", error);
  });
}

const loadStorage = async () => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction('storage', 'readonly');
    const storage = transaction.objectStore('storage');
    const themeReq = storage.get('theme');
    const userReq = storage.get('user');

    const themeData = await new Promise((resolve, reject) => {
      themeReq.onsuccess = function (event) {
        resolve(event.target.result);
      };
      themeReq.onerror = function (event) {
        reject(event.target.errorCode);
      };
    });
    const user = await new Promise((resolve, reject) => {
      userReq.onsuccess = function (event) {
        resolve(event.target.result);
      };
      userReq.onerror = function (event) {
        reject(event.target.errorCode);
      };
    });

    return {themeData, user};
  } catch (err) {
    console.error('[loadStorage]', err);
    return {};
  }
};

function App() {
  const [researcherName, setResearcherName] = useState('');
  const [theme, setTheme] = useState('light');
  const [isLoading, setIsLoading] = useState(false);

  loadStorage()
      .then(({ themeData, user }) => {
        if(themeData?.theme) setTheme(themeData?.theme);
        if(user?.username) setResearcherName(user?.username);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('[loadStorage]', err);
        setIsLoading(false);
      });

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
    const newValue = theme === 'light' ? 'dark' : 'light';
    setTheme(newValue);

    openDatabase()
        .then(db => {
          let tx = db.transaction('storage', 'readwrite');
          let store = tx.objectStore('storage');

          store.put({id: 'theme', theme: newValue});
        }).catch(err => {
          console.error('[toggleTheme]', err);
        });
  };

  return (
      <div className={`${theme} dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-600 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400`}>
        {isLoading ? (
            <Spinner />
        ) : (
            <>
              <HeaderBar toggleTheme={toggleTheme} />
              {researcherName ? (
                  <div className="mx-auto max-w-screen-md min-h-screen pt-20 pb-14 px-safe dark:text-zinc-50 ml-5 mr-5">
                    <SurveyForm researcherName={researcherName} theme={theme} />
                  </div>
              ) : (
                  <Login onLogin={handleLogin} theme={theme} />
              )}
            </>
        )}
      </div>
  );

}

export default App;
