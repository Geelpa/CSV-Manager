import { parseSpreadsheet }
    from "./parser.js";

import { renderContacts }
    from "./contacts.js";

import {
    createSheet,
    saveContacts
}
    from "./firestore.js";


export function initializeUpload() {

    const uploadBtn =
        document.getElementById("uploadBtn");

    const fileInput =
        document.getElementById("fileInput");

    uploadBtn.addEventListener("click", async () => {

        const file =
            fileInput.files[0];

        if (!file) {

            alert("Selecione um arquivo");

            return;
        }

        try {

            // LER PLANILHA
            const data =
                await parseSpreadsheet(file);

            console.log(data);

            // CRIAR PLANILHA
            const sheetId =
                await createSheet(file.name);

            console.log("Sheet criada:", sheetId);

            // SALVAR CONTATOS
            await saveContacts(sheetId, data);

            console.log("Contatos salvos!");

            // RENDER LOCAL
            renderContacts(data);

        } catch (error) {

            console.error(error);

            alert("Erro ao importar planilha");
        }
    });
}