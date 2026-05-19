import { auth, db } from "./firebase-config.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

loginTab.addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");

    loginTab.classList.add("bg-blue-500", "text-white");
    registerTab.classList.remove("bg-green-500", "text-white");
});

registerTab.addEventListener("click", () => {
    registerForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
});


// LOGIN
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {

        await signInWithEmailAndPassword(auth, email, password);

        window.location.href = "dashboard.html";

    } catch (error) {
        alert(error.message);
    }
});


// CADASTRO
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    try {

        const userCredential =
            await createUserWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;

        // salva no firestore
        await setDoc(doc(db, "users", user.uid), {
            name,
            email,
            createdAt: new Date()
        });

        window.location.href = "dashboard.html";

    } catch (error) {
        alert(error.message);
    }
});