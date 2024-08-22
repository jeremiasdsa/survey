// import firebase from 'firebase/app';
// import 'firebase/database';
//
// // Sua configuração do Firebase aqui
// const firebaseConfig = {
//     apiKey: "YOUR_API_KEY",
//     authDomain: "YOUR_AUTH_DOMAIN",
//     databaseURL: "YOUR_DATABASE_URL",
//     projectId: "YOUR_PROJECT_ID",
//     storageBucket: "YOUR_STORAGE_BUCKET",
//     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//     appId: "YOUR_APP_ID"
// };
//
// firebase.initializeApp(firebaseConfig);
//
// const database = firebase.database();
//
// export { database };


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBeHfj9tjBfLC42YtLUzsyWe5hIAHpUaWQ",
    authDomain: "pesquisa-e2761.firebaseapp.com",
    projectId: "pesquisa-e2761",
    storageBucket: "pesquisa-e2761.appspot.com",
    messagingSenderId: "811909568742",
    appId: "1:811909568742:web:1830c97379fd5a5ffc4327",
    measurementId: "G-K0SKVDC617"
//    databaseURL: "YOUR_DATABASE_URL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = firebase.database();

export { database };