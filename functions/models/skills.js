const { Query, ID } = require("node-appwrite");
const { db, generateDBAuth } = require("./config");

const _databaseId = process.env.APPWRITE_DATABASE_ID;
const _collectionId = "skills";

async function getAllSkills() {
	const data = await db.listDocuments(_databaseId, _collectionId, [
		Query.select(["$id", "name", "percent"]),
		Query.orderDesc("percent"),
		Query.orderAsc("name"),
	]);
	return data.documents;
}

async function getSkillById(id) {
	const data = await db.getDocument(_databaseId, _collectionId, id, [
		Query.select(["$id", "name", "percent"]),
	]);
	return data;
}

async function createSkill({ name, percent, signature }) {
	let database = generateDBAuth({ jwt: signature });
	const data = await database.createDocument(
		_databaseId,
		_collectionId,
		ID.unique(),
		{
			name,
			percent,
		}
	);
	return data;
}

async function updateSkill(id, { name, percent, signature }) {
	let database = generateDBAuth({ jwt: signature });
	const data = await database.updateDocument(
		_databaseId,
		_collectionId,
		id,
		{
			name,
			percent,
		},
		[]
	);
	return data;
}

async function deleteSkill(id, signature) {
	let database = generateDBAuth({ jwt: signature });
	const data = await db.deleteDocument(_databaseId, _collectionId, id);
	return data;
}

module.exports = {
	getAllSkills,
	getSkillById,
	createSkill,
	updateSkill,
	deleteSkill,
};
