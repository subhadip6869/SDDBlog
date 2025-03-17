const { ID, Query } = require("node-appwrite");
const { generateDBAuth, db } = require("./config");

const _databaseId = process.env.APPWRITE_DATABASE_ID;
const _collectionId = "projects";

async function createProject({
    project_name,
    project_version,
    project_desc,
    project_link,
    project_link_play,
    project_explore,
    project_categories,
    signature,
}) {
    const database = generateDBAuth({ jwt: signature });
    const _documentId = ID.unique();
    const projectData = {
        project_name,
        project_version,
        project_desc,
        project_link,
        project_link_play,
        project_explore,
        project_categories,
    };
    let data = await database.createDocument(
        _databaseId,
        _collectionId,
        _documentId,
        projectData
    );
    if (!data["project_categories"]["category_name"]) {
        // delete the created document
        await database.deleteDocument(_databaseId, _collectionId, _documentId);
        // return a error with status code 400
        throw { code: 400, message: "Invalid project category" };
    }
    // return { $id: _documentId, ...projectData };
    return data;
}

async function getProjectsByCategory({ category_id }) {
    const data = await db.listDocuments(_databaseId, _collectionId, [
        // Query.select([
        //     "$id",
        //     "project_name",
        //     "project_version",
        //     "project_desc",
        //     "project_link",
        //     "project_link_play",
        //     "project_explore",
        //     // "project_categories",
        // ]),
        // Query.equal("project_categories.$id", category_id),
    ]);

    return data.documents
        .filter((p) =>
            category_id ? p.project_categories["$id"] === category_id : true
        )
        .map((project) => ({
            $id: project.$id,
            project_name: project.project_name,
            project_version: project.project_version,
            project_desc: project.project_desc,
            project_link: project.project_link,
            project_link_play: project.project_link_play,
            project_explore: project.project_explore,
            project_categories: {
                $id: project.project_categories.$id,
                category_name: project.project_categories.category_name,
            },
        }));
}

async function updateProject({
    project_id,
    project_name,
    project_version,
    project_desc,
    project_link,
    project_link_play,
    project_explore,
    project_categories,
    signature,
}) {
    const database = generateDBAuth({ jwt: signature });
    const projectData = {
        project_name,
        project_version,
        project_desc,
        project_link,
        project_link_play,
        project_explore,
        project_categories,
    };
    let categories = await getProjectCategories();
    let category = categories.find((c) => c.$id === project_categories);
    if (!category) {
        // return a error with status code 400
        throw { code: 400, message: "Invalid project category" };
    }
    let data = await database.updateDocument(
        _databaseId,
        _collectionId,
        project_id,
        projectData
    );
    return data;
}

async function getProjectCategories() {
    const data = await db.listDocuments(_databaseId, "project_categories", []);
    return data.documents;
}

async function deleteProject(id, { signature }) {
    let database = generateDBAuth({ jwt: signature });
    await database.deleteDocument(_databaseId, _collectionId, id);
}

module.exports = {
    createProject,
    getProjectsByCategory,
    updateProject,
    getProjectCategories,
    deleteProject,
};
