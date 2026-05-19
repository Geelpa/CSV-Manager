export function renderContacts(contacts) {

    const container =
        document.getElementById("contactsContainer");

    container.innerHTML = "";

    contacts.forEach((contact) => {

        const values =
            Object.values(contact);

        let id = "-";
        let name = "";
        let phone = "";

        if (values.length === 2) {

            name = values[0];
            phone = values[1];

        } else {

            id = values[0];
            name = values[1];
            phone = values[2];
        }

        const card =
            document.createElement("div");

        card.className =
            "bg-white p-4 rounded-xl shadow flex items-center justify-between";

        card.innerHTML = `
        
            <div>
                <p class="text-sm text-gray-400">
                    ID: ${id}
                </p>

                <h2 class="font-bold text-lg">
                    ${name}
                </h2>

                <p class="text-gray-600">
                    ${phone}
                </p>
            </div>

            <div class="flex gap-2">

                <button
                    class="copyBtn bg-gray-200 px-4 py-2 rounded-lg"
                    data-phone="${phone}"
                >
                    Copiar
                </button>

            </div>
        `;

        container.appendChild(card);
    });

    setupButtons();
}


function setupButtons() {

    const copyButtons =
        document.querySelectorAll(".copyBtn");

    copyButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const phone =
                button.dataset.phone;

            navigator.clipboard.writeText(phone);

            button.innerText = "Copiado!";

            setTimeout(() => {

                button.innerText = "Copiar";

            }, 1500);
        });
    });
}