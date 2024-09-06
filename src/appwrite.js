import { Client, Account, Databases, OAuthProvider } from 'appwrite';

const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_URL;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;


if (!endpoint || !projectId) {
    throw new Error('Appwrite endpoint or project ID is not defined');
}

client
    .setEndpoint(endpoint)
    .setProject(projectId);


export { OAuthProvider }
export const account = new Account(client);
export const databases = new Databases(client);
