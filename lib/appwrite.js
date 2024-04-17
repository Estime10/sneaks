import {
Account,
Avatars,
Client,
Databases,
ID,
Query,
} from 'react-native-appwrite';

export const appwriteConfig = {
endpoint: 'https://cloud.appwrite.io/v1',
platform: 'com.myself.sneaks',
projectId: '661e234d9e38a272b4f1',
databaseId: '661e284c85e0d91dfebe',
userCollectionId: '661e287a70fa97d59804',
postsCollectionId: '661e28ae421bdec1a5da',
storageId: '661e2b1c81a121d622fd',
};

const {
endpoint,
platform,
projectId,
databaseId,
userCollectionId,
postsCollectionId,
storageId,
} = appwriteConfig;

// Init your react-native SDK
const client = new Client();

client
.setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
.setProject(appwriteConfig.projectId) // Your project ID
.setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export async function createUser(email, password, username) {
try {
const newAccount = await account.create(ID.unique(), email, password, username);

if (!newAccount) throw Error;

const avatarUrl = avatars.getInitials(username);

await signIn(email, password);

const newUser = await databases.createDocument(
appwriteConfig.databaseId,
appwriteConfig.userCollectionId,
ID.unique(),
{
accountId: newAccount.$id,
email: email,
username: username,
avatar: avatarUrl,
}
);

return newUser;
} catch (error) {
throw new Error(error);
}
}

// Login User
export async function signIn(email, password) {
try {
const session = await account.createEmailSession(email, password);
return session;
} catch (error) {
console.error(error);
throw new Error(error);
}
}

// Get Current User
export async function getCurrentUser() {
try {
const currentAccount = await account.get();
if (!currentAccount) throw Error;

const currentUser = await databases.listDocuments(
databaseId,
userCollectionId,
[Query.equal('accountId', currentAccount.$id)]
);

if (!currentUser) throw Error;

return currentUser.documents[0];
} catch (error) {
console.log(error);
return null;
}
}

// Get All Posts
export async function getPosts() {
try {
const posts = await databases.listDocuments(databaseId, postsCollectionId);
return posts.documents;
} catch (error) {
throw new Error(error);
}
}

// Get Latest Posts
export async function getLatestPosts() {
try {
const posts = await databases.listDocuments(databaseId, postsCollectionId, [
Query.orderDesc('$createdAt'),
Query.limit(7),
]);

return posts.documents;
} catch (error) {
throw new Error(error);
}
}
