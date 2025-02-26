const sdk = require("node-appwrite");

const client = new sdk.Client();
client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const db = new sdk.Databases(client);

module.exports = { db };
