import { Account, Client } from "appwrite";

const client = new Client();
client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("676ba6a1000d19be09ab");
const account = new Account(client);

export default account;
