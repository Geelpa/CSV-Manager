import { db, auth }
    from "../firebase/firebase-config.js"

import {
    addDoc,
    collection,
    serverTimestamp,
    getDocs,
    query,
    where,
    updateDoc,
    doc,
    writeBatch
}
    from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";


// CRIAR PLANILHA
export async function createSheet(sheetName) {

    const user = auth.currentUser;

    const sheetRef = await addDoc(
        collection(db, "sheets"),
        {
            userId: user.uid,
            name: sheetName,
            createdAt: serverTimestamp()
        }
    );

    return sheetRef.id;
}


// SALVAR CONTATOS
export async function saveContacts(sheetId, contacts) {

    const user = auth.currentUser;

    const batch =
        writeBatch(db);

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

        if (!name || !phone) return;

        const contactRef =
            doc(collection(db, "contacts"));

        batch.set(contactRef, {

            userId: user.uid,
            sheetId,
            externalId: id,
            name,
            phone,
            status: "pending",
            createdAt: serverTimestamp()
        });
    });

    await batch.commit();
}


// BUSCAR CONTATOS
export async function getContacts(sheetId, status = "pending") {

    const q = query(
        collection(db, "contacts"),
        where("sheetId", "==", sheetId),
        where("status", "==", status)
    );

    const snapshot =
        await getDocs(q);

    return snapshot.docs.map((doc) => ({
        firestoreId: doc.id,
        ...doc.data()
    }));
}


// ALTERAR STATUS
export async function updateContactStatus(contactId, status) {

    const ref =
        doc(db, "contacts", contactId);

    await updateDoc(ref, {
        status
    });
}