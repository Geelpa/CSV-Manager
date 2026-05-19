import {
    getSheets
}
    from "./firestore.js";
import {
    deleteSheet
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
        
    <div class="flex items-center justify-between">

        <h3 class="font-bold">
            📁 ${sheet.name}
        </h3>

        <button
            class="deleteSheetBtn bg-red-500 text-white px-3 py-1 rounded-lg"
        >
            🗑
        </button>

    </div>
`;

        card.addEventListener("click", async () => {
            const deleteBtn =
                card.querySelector(".deleteSheetBtn");

            deleteBtn.addEventListener("click", async (e) => {

                e.stopPropagation();

                const confirmDelete =
                    confirm(
                        `Excluir ${sheet.name}?`
                    );

                if (!confirmDelete) return;

                await deleteSheet(
                    sheet.firestoreId
                );

                await loadSheets();

                document.getElementById(
                    "contactsContainer"
                ).innerHTML = "";

                document
                    .getElementById("activeSheet")
                    .classList.add("hidden");

                document
                    .getElementById("emptyState")
                    .classList.remove("hidden");
            });
            setCurrentSheetId(
                sheet.firestoreId
            );

            document
                .getElementById("emptyState")
                .classList.add("hidden");

            document
                .getElementById("activeSheet")
                .classList.remove("hidden");

            document
                .getElementById("activeSheetName")
                .innerText = sheet.name;

            await renderContacts(
                sheet.firestoreId,
                "pending"
            );
        });

        container.appendChild(card);
    });
}