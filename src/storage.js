const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("offlineDataDB", 1);

        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("dataStore")) {
                db.createObjectStore("dataStore", { keyPath: 'id' });
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

export { openDatabase };
