// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const database = getDatabase(app);

const fireDb = initializeFirestore(app, {
    localCache: persistentLocalCache()
});

export { analytics, database, fireDb };
