import { auth, db } from "./firebase/firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";


import { initializeUpload }
    from "./modules/upload.js";

const welcomeText = document.getElementById("welcomeText");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "index.html";
        return;
    }

    try {

        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {

            const userData = userSnap.data();

            welcomeText.innerText =
                `Olá, ${userData.name} 👋`;
        }

    } catch (error) {

        console.error(error);

        welcomeText.innerText =
            "Olá 👋";
    }

});

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "index.html";
});

initializeUpload();