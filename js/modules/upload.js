import { parseSpreadsheet }
    from "./parser.js";

import { renderContacts }
    from "./contacts.js";

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

            const data =
                await parseSpreadsheet(file);

            console.log(data);

            renderContacts(data);

        } catch (error) {

            console.error(error);

            alert("Erro ao ler planilha");
        }
    });
}