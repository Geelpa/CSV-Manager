import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDdx2jqpo8lS0HF-ME5XrnBTRlYsU9po7M",
    authDomain: "csv-manager-7a5a4.firebaseapp.com",
    projectId: "csv-manager-7a5a4",
    storageBucket: "csv-manager-7a5a4.firebasestorage.app",
    messagingSenderId: "71637617568",
    appId: "1:71637617568:web:ac9165098ec4edc035b2c5"
};
// Inicializa app
const app = initializeApp(firebaseConfig);

// Inicializa serviços
const auth = getAuth(app);
const db = getFirestore(app);

// Exporta
export { auth, db };

