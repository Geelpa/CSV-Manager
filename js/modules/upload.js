import {
    createSheet,
    saveContacts,
    getContacts
}
    from "./firestore.js";

import { parseSpreadsheet }
    from "./parser.js";

import {
    loadSheets
}
    from "./sheets.js";

import { renderContacts }
    from "./contacts.js";

import {
    setCurrentSheetId
}
    from "../dashboard.js";


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

            // CRIAR PLANILHA
            const sheetId =
                await createSheet(file.name);
            setCurrentSheetId(sheetId);

            // SALVAR CONTATOS
            await saveContacts(sheetId, data);

            // RENDER LOCAL
            const contacts =
                await getContacts(sheetId);

            await renderContacts(

                sheetId,
                "pending"
            );

            await loadSheets();

        } catch (error) {

            console.error(error);

            alert("Erro ao importar planilha");
        }


    });
}