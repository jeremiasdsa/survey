import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import SurveyForm from './components/survey/SurveyForm';
import { database } from "./firebase";
import { openDatabase } from "./storage";
import { ref, push, set } from 'firebase/database';
import HeaderBar from './components/HeaderBar';
import './index.css';
import Spinner from "./components/Spinner";

// Função para sincronizar dados do IndexedDB com o Firebase
// const syncDataWithFirebase = async () => {
//   openDatabase().then(db => {
//     const transaction = db.transaction("dataStore", "readonly");
//     const store = transaction.objectStore("dataStore");
//
//     const allData = store.getAll();
//     allData.onsuccess = function() {
//       allData.result.forEach(data => {
//         if(!data.synced) {
//           push(ref(database, 'surveys'), data).catch(error => {
//             console.error("Erro ao sincronizar com o Firebase:", error);
//           });
//         }
//       });
//
//       // Limpar os dados da IndexedDB após a sincronização
//       // const clearTransaction = db.transaction("dataStore", "readwrite");
//       // const clearStore = clearTransaction.objectStore("dataStore");
//       // clearStore.clear();
//       console.log("NAO ESTOU LIMPANDO -- Realtime está poluindo mais por causa disso!??")
//       console.log("Dados sincronizados e IndexedDB limpo.");
//     };
//
//     allData.onerror = function(event) {
//       console.error("Erro ao recuperar dados da IndexedDB:", event.target.errorCode);
//     };
//   }).catch(error => {
//     console.error("Erro ao abrir o IndexedDB:", error);
//   });
// }

// Function to sync data
// Function to sync data
const syncDataWithFirebase = async () => {
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
      if (!item.synced) {
        try {
          // Try syncing each unsynced item to Firebase
          const surveyId = item.id;
          // const newSurveyRef = ref(database, `surveys/${surveyId}`);
          const newSurveyRef = ref(database, `sur/${surveyId}`);

          await set(newSurveyRef, { ...item, id: surveyId });
          // CONVERSAR COM JORDAO .. AQUI DEVERIA SER AWAIT OU TERM O THEN?

          // Mark the item as synced in IndexedDB
          const updateTransaction = db.transaction("dataStore", "readwrite");
          const updateStore = updateTransaction.objectStore("dataStore");
          await updateStore.put({ ...item, synced: true });

          console.log(`Data with ID ${surveyId} synced successfully.`);
        } catch (syncError) {
          console.error(`Error syncing data with ID ${item.id}:`, syncError);
        }
      }
    }
  } catch (err) {
    console.error('Error accessing IndexedDB for syncing:', err);
  }
};

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


  //  Disable Pull-to-Refresh on Android Chrome:
  window.addEventListener('load', () => {
    let lastTouchY = 0;
    let preventPullToRefresh = false;

    document.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) {
        return;
      }
      lastTouchY = e.touches[0].clientY;
      preventPullToRefresh = window.pageYOffset === 0;
    }, {passive: false});

    document.addEventListener('touchmove', (e) => {
      const touchY = e.touches[0].clientY;
      const touchYDelta = touchY - lastTouchY;

      if (preventPullToRefresh) {
        preventPullToRefresh = false;

        if (touchYDelta > 0) {
          e.preventDefault();
          return;
        }
      }
    }, {passive: false});
  });

  document.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, { passive: false });

  document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, { passive: false });

  document.addEventListener('touchend', function(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, { passive: false });

  return (
      <div className={`${theme} dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-600 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400`}>
        {isLoading ? (
            <Spinner />
        ) : (
            <>
              <HeaderBar
                  toggleTheme={toggleTheme}
                  showOptions={researcherName === 'root'}
              />
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
