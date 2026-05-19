import {
    updateContactStatus,
    getContacts
}
    from "./firestore.js";
let currentContacts = [];

export async function renderContacts(
    sheetId,
    status = "pending"
) {

    const contacts =
        await getContacts(
            sheetId,
            status
        );

    const container =
        document.getElementById(
            "contactsContainer"
        );

    container.innerHTML = "";

    contacts.forEach((contact) => {

        const card =
            document.createElement("div");

        card.className =
            "bg-white p-4 rounded-xl shadow flex items-center justify-between";

        card.innerHTML = `
        
            <div>
                <p class="text-sm text-gray-400">
                    ID: ${contact.externalId || "-"}
                </p>

                <h2 class="font-bold text-lg">
                    ${contact.name}
                </h2>

                <p class="text-gray-600">
                    ${contact.phone}
                </p>
            </div>

            <div class="flex gap-2">

                <button
                    class="copyBtn bg-gray-200 px-4 py-2 rounded-lg"
                    data-phone="${contact.phone}"
                >
                    Copiar
                </button>

                <button
                    class="calledBtn bg-green-500 text-white px-4 py-2 rounded-lg"
                    data-id="${contact.firestoreId}"
                >
                    ✓
                </button>

                <button
                    class="deleteBtn bg-red-500 text-white px-4 py-2 rounded-lg"
                    data-id="${contact.firestoreId}"
                >
                    ✕
                </button>

            </div>
        `;

        container.appendChild(card);
    });

    setupButtons(sheetId, status);
}


function setupButtons(
    sheetId,
    currentStatus
) {

    // COPIAR
    document.querySelectorAll(".copyBtn")
        .forEach((button) => {

            button.addEventListener("click", () => {

                navigator.clipboard.writeText(
                    button.dataset.phone
                );

                button.innerText =
                    "Copiado!";

                setTimeout(() => {

                    button.innerText =
                        "Copiar";

                }, 1500);
            });
        });


    // CHAMADO
    document.querySelectorAll(".calledBtn")
        .forEach((button) => {

            button.addEventListener("click", async () => {

                await updateContactStatus(
                    button.dataset.id,
                    "called"
                );

                await renderContacts(
                    sheetId,
                    currentStatus
                );
            });
        });


    // EXCLUIR
    document.querySelectorAll(".deleteBtn")
        .forEach((button) => {

            button.addEventListener("click", async () => {

                await updateContactStatus(
                    button.dataset.id,
                    "deleted"
                );

                await renderContacts(
                    sheetId,
                    currentStatus
                );
            });
        });
}