import { auth, db }
    from "./firebase/firebase-config.js";

import {
    loadSheets
}
    from "./modules/sheets.js";

import {
    onAuthStateChanged,
    signOut
}
    from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

import {
    doc,
    getDoc
}
    from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

import {
    initializeUpload
}
    from "./modules/upload.js";


const welcomeText =
    document.getElementById("welcomeText");

const logoutBtn =
    document.getElementById("logoutBtn");


onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href =
            "index.html";

        return;
    }

    try {

        const userRef =
            doc(db, "users", user.uid);

        const userSnap =
            await getDoc(userRef);

        if (userSnap.exists()) {

            const userData =
                userSnap.data();

            welcomeText.innerText =
                `Olá, ${userData.name} 👋`;
            await loadSheets();
        }

    } catch (error) {

        console.error(error);

        welcomeText.innerText =
            "Olá 👋";
    }
});


logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href =
        "index.html";
});


// INICIALIZA UPLOAD
initializeUpload();

import {
    renderContacts
}
    from "./modules/contacts.js";

import {
    getContacts
}
    from "./modules/firestore.js";


let activeContacts = [];
export let currentSheetId = null;

export function setCurrentSheetId(sheetId) {

    currentSheetId = sheetId;
}


// ABAS
document
    .getElementById("pendingTab")
    .addEventListener("click", async () => {

        if (!currentSheetId) return;

        await renderContacts(
            currentSheetId,
            "pending"
        );
    });


document
    .getElementById("calledTab")
    .addEventListener("click", async () => {

        if (!currentSheetId) return;

        await renderContacts(
            currentSheetId,
            "called"
        );
    });


document
    .getElementById("deletedTab")
    .addEventListener("click", async () => {

        if (!currentSheetId) return;

        await renderContacts(
            currentSheetId,
            "deleted"
        );
    });

