import * as sdk from 'node-appwrite';

const { NEXT_PUBLIC_ENDPOINT, PROJECT_ID, API_KEY } = process.env;

if (!NEXT_PUBLIC_ENDPOINT || !PROJECT_ID || !API_KEY) {
  throw new Error('Missing environment variables for Appwrite configuration');
}

console.log('variables exists:', { NEXT_PUBLIC_ENDPOINT, PROJECT_ID, API_KEY });
const client = new sdk.Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
  .setProject(process.env.PROJECT_ID!)
  .setKey(process.env.API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
