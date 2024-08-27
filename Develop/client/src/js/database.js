import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Method to add content to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Open the jate database
  const db = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges
  const tx = db.transaction('jate', 'readwrite');

  // Open the object store
  const store = tx.objectStore('jate');

  // Add or update the content in the store
  const request = store.put({ content });

  // Confirm the request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Method to get all content from the database
export const getDb = async () => {
  console.log('GET all from the database');

  // Open the jate database
  const db = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges
  const tx = db.transaction('jate', 'readonly');

  // Open the object store
  const store = tx.objectStore('jate');

  // Get all content from the store
  const request = store.getAll();

  // Confirm the request and return the result
  const result = await request;
  console.log('🚀 - data retrieved from the database', result);
  return result;
};

initdb();

