import {
    getSheets
}
    from "./firestore.js";

import {
    renderContacts
}
    from "./contacts.js";

import {
    setCurrentSheetId
}
    from "../dashboard.js";


export async function loadSheets() {

    const sheets =
        await getSheets();

    const container =
        document.getElementById(
            "sheetsContainer"
        );

    container.innerHTML = "";

    sheets.forEach((sheet) => {

        const card =
            document.createElement("button");

        card.className =
            "w-full bg-white shadow rounded-xl p-4 text-left hover:bg-gray-100";

        card.innerHTML = `
        
            <h3 class="font-bold">
                📁 ${sheet.name}
            </h3>
        `;

        card.addEventListener("click", async () => {

            setCurrentSheetId(
                sheet.firestoreId
            );

            await renderContacts(
                sheet.firestoreId,
                "pending"
            );
        });

        container.appendChild(card);
    });
}