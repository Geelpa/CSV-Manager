export function parseSpreadsheet(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = (event) => {

            try {

                const data =
                    new Uint8Array(event.target.result);

                const workbook =
                    XLSX.read(data, {
                        type: "array"
                    });

                const sheetName =
                    workbook.SheetNames[0];

                const worksheet =
                    workbook.Sheets[sheetName];

                const jsonData =
                    XLSX.utils.sheet_to_json(worksheet);

                const normalizedData =
                    jsonData.map((row) => {

                        const normalizedRow = {};

                        Object.keys(row).forEach((key) => {

                            const cleanKey =
                                key
                                    .trim()
                                    .toLowerCase();

                            normalizedRow[cleanKey] =
                                row[key];
                        });

                        return normalizedRow;
                    });

                resolve(normalizedData);

            } catch (error) {

                reject(error);
            }
        };

        reader.readAsArrayBuffer(file);
    });
}