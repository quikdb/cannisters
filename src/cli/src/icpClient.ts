import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory } from '../../declarations/icp';

const canisterId = 'bkyz2-fmaaa-aaaaa-qaaaq-cai';
const agent = new HttpAgent({ host: 'http://127.0.0.1:4943' });

if (process.env.NODE_ENV !== 'production') {
  agent.fetchRootKey(); // Fetch root key in non-production environments for local testing
}

const quikDB = Actor.createActor(idlFactory, {
  agent,
  canisterId,
});

// Project Functions

export async function createProject(name: string, description: string, createdBy: string = 'w7x7r-cok77-xa') {
  try {
    const result = await quikDB.createProject(name, description, createdBy);
    console.log('Project created:', result);
  } catch (err) {
    console.error('Error creating project:', err);
  }
}

export async function listProjects() {
  try {
    const projects = await quikDB.getProjects();
    console.log('Projects:', projects);
  } catch (err) {
    console.error('Error listing projects:', err);
  }
}

export async function updateProject(
  id: number,
  name: string,
  description: string,
  updatedBy: string = 'w7x7r-cok77-xa'
) {
  try {
    const result = await quikDB.updateProject(id, name, description, updatedBy);
    console.log('Project updated:', result);
  } catch (err) {
    console.error('Error updating project:', err);
  }
}

// Database Functions

export async function createDatabase(projectId: number, name: string, createdBy: string = 'w7x7r-cok77-xa') {
  try {
    const result = await quikDB.createDatabase(projectId, name, createdBy);
    console.log('Database created:', result);
  } catch (err) {
    console.error('Error creating database:', err);
  }
}

export async function listDatabases() {
  try {
    const databases = await quikDB.getDatabases();
    console.log('Databases:', databases);
  } catch (err) {
    console.error('Error listing databases:', err);
  }
}

export async function updateDatabase(id: number, name: string, updatedBy: string = 'w7x7r-cok77-xa') {
  try {
    const result = await quikDB.updateDatabase(id, name, updatedBy);
    console.log('Database updated:', result);
  } catch (err) {
    console.error('Error updating database:', err);
  }
}

// Data Group Functions

export async function createDataGroup(
  databaseId: number,
  projectId: number,
  name: string,
  createdBy: string = 'w7x7r-cok77-xa'
) {
  try {
    const result = await quikDB.createDataGroup(databaseId, projectId, name, createdBy);
    console.log('Data group created:', result);
  } catch (err) {
    console.error('Error creating data group:', err);
  }
}

export async function listDataGroups() {
  try {
    const dataGroups = await quikDB.getDataGroups();
    console.log('Data groups:', dataGroups);
  } catch (err) {
    console.error('Error listing data groups:', err);
  }
}

export async function updateDataGroup(id: number, name: string, updatedBy: string = 'w7x7r-cok77-xa') {
  try {
    const result = await quikDB.updateDataGroup(id, name, updatedBy);
    console.log('Data group updated:', result);
  } catch (err) {
    console.error('Error updating data group:', err);
  }
}

// Item Functions

export async function createItem(key: string, value: string) {
  try {
    const blobValue = new Blob([value]); // Convert string to Blob
    const result = await quikDB.putItem(key, blobValue);
    console.log('Item created:', result);
  } catch (err) {
    console.error('Error creating item:', err);
  }
}

export async function listItems() {
  try {
    const items = await quikDB.listAllKeys();
    console.log('Items:', items);
  } catch (err) {
    console.error('Error listing items:', err);
  }
}

export async function updateItem(key: string, value: string) {
  try {
    const blobValue = new Blob([value]); // Convert string to Blob
    const result = await quikDB.putItem(key, blobValue);
    console.log('Item updated:', result);
  } catch (err) {
    console.error('Error updating item:', err);
  }
}

// Batch Functions

export async function batchWriteItems(items: { key: string; value: string }[]) {
  try {
    const formattedItems = items.map((item) => [item.key, new Blob([item.value])] as [string, Blob]);
    const result = await quikDB.createBatchItems(formattedItems);
    console.log('Batch items written:', result);
  } catch (err) {
    console.error('Error writing batch items:', err);
  }
}

export async function batchGetItems(keys: string[]) {
  try {
    const result = await quikDB.getBatchItems(keys);
    console.log('Batch items fetched:', result);
  } catch (err) {
    console.error('Error fetching batch items:', err);
  }
}
