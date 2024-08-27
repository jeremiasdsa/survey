import { initializeApp } from "firebase/app";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBeHfj9tjBfLC42YtLUzsyWe5hIAHpUaWQ",
    authDomain: "pesquisa-e2761.firebaseapp.com",
    databaseURL: "https://pesquisa-e2761-default-rtdb.firebaseio.com",
    projectId: "pesquisa-e2761",
    storageBucket: "pesquisa-e2761.appspot.com",
    messagingSenderId: "811909568742",
    appId: "1:811909568742:web:1830c97379fd5a5ffc4327",
    measurementId: "G-K0SKVDC617"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = initializeFirestore(app, {
    localCache: persistentLocalCache()
});

export { database };
