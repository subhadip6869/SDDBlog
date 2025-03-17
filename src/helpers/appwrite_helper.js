import { Account, Client, Storage } from "appwrite";

const client = new Client();
client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("676ba6a1000d19be09ab");
const account = new Account(client);
const storage = new Storage(client);

export { account, storage };
