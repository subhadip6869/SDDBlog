const { ID, Query } = require("node-appwrite");
const { generateDBAuth, db } = require("./config");

const _databaseId = process.env.APPWRITE_DATABASE_ID;
const _collectionId = "educations";

async function createEducation({
    course,
    description,
    start_period,
    end_period,
    signature,
}) {
    const database = generateDBAuth({ jwt: signature });
    const _documentId = ID.unique();
    const educationData = {
        course,
        description,
        start_period,
        end_period,
    };
    await database.createDocument(
        _databaseId,
        _collectionId,
        _documentId,
        educationData
    );
    return { $id: _documentId, ...educationData };
}

async function getAllEducations() {
    const educations = await db.listDocuments(_databaseId, _collectionId, [
        Query.select([
            "$id",
            "course",
            "description",
            "start_period",
            "end_period",
        ]),
        Query.orderDesc("start_period"),
        Query.orderDesc("end_period"),
    ]);
    return educations.documents.map((education) => {
        education["start_period"] = new Date(education["start_period"]);
        education["end_period"] = education["end_period"]
            ? new Date(education["end_period"])
            : null;
        return education;
    });
}

async function getEducationById(id) {
    const data = await db.getDocument(_databaseId, _collectionId, id, [
        Query.select([
            "$id",
            "course",
            "description",
            "start_period",
            "end_period",
        ]),
    ]);
    delete data["$permissions"];
    delete data["$databaseId"];
    delete data["$collectionId"];
    data["start_period"] = new Date(data["start_period"]);
    data["end_period"] = data["end_period"]
        ? new Date(data["end_period"])
        : null;
    return data;
}

async function updateEducation(
    id,
    { course, description, start_period, end_period, signature }
) {
    let database = generateDBAuth({ jwt: signature });
    const data = await database.updateDocument(
        _databaseId,
        _collectionId,
        id,
        {
            course,
            description,
            start_period,
            end_period,
        },
        []
    );
    delete data["$permissions"];
    delete data["$databaseId"];
    delete data["$collectionId"];
    delete data["$createdAt"];
    delete data["$updatedAt"];
    data["start_period"] = new Date(data["start_period"]);
    data["end_period"] = data["end_period"]
        ? new Date(data["end_period"])
        : null;
    return data;
}

async function deleteEducation(id, { signature }) {
    let database = generateDBAuth({ jwt: signature });
    await database.deleteDocument(_databaseId, _collectionId, id);
}

module.exports = {
    createEducation,
    getAllEducations,
    getEducationById,
    updateEducation,
    deleteEducation,
};
