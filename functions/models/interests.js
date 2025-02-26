const { Query, ID } = require("node-appwrite");
const { db } = require("./config");

const _databaseId = process.env.APPWRITE_DATABASE_ID;
const _collectionId = "interests";

async function createInterest({
    intr_icon,
    intr_title,
    intr_desc,
    skill_percent,
}) {
    const _documentId = ID.unique();
    const interestData = {
        intr_icon,
        intr_title,
        intr_desc,
        skill_percent,
    };
    await db.createDocument(
        _databaseId,
        _collectionId,
        _documentId,
        interestData
    );
    return { $id: _documentId, ...interestData };
}

async function getAllInterests() {
    const data = await db.listDocuments(_databaseId, _collectionId, [
        Query.select([
            "$id",
            "intr_icon",
            "intr_title",
            "intr_desc",
            "skill_percent",
        ]),
        Query.orderAsc("intr_title"),
    ]);
    return data.documents;
}

async function getInterestById(id) {
    const data = await db.getDocument(_databaseId, _collectionId, id, [
        Query.select([
            "$id",
            "intr_icon",
            "intr_title",
            "intr_desc",
            "skill_percent",
        ]),
    ]);
    delete data["$permissions"];
    delete data["$databaseId"];
    delete data["$collectionId"];
    return data;
}

async function updateInterest(
    id,
    { intr_icon, intr_title, intr_desc, skill_percent }
) {
    const data = await db.updateDocument(
        _databaseId,
        _collectionId,
        id,
        {
            intr_icon,
            intr_title,
            intr_desc,
            skill_percent,
        },
        []
    );
    delete data["$permissions"];
    delete data["$databaseId"];
    delete data["$collectionId"];
    delete data["$createdAt"];
    delete data["$updatedAt"];
    return data;
}

async function deleteInterest(id) {
    await db.deleteDocument(_databaseId, _collectionId, id);
}

module.exports = {
    createInterest,
    getAllInterests,
    getInterestById,
    updateInterest,
    deleteInterest,
};
