import { openDB } from 'idb';

// Define the schema
function createDatabase(db) {
    // Create messages store
    if (!db.objectStoreNames.contains('messages')) {
        const store = db.createObjectStore('messages', {
            keyPath: 'id',
            autoIncrement: true,
        });
        store.createIndex('sessionId', 'sessionId', { unique: false });
        store.createIndex('type', 'type', { unique: false });
        store.createIndex('timestamp', 'timestamp', { unique: false });
        store.createIndex('confidence', 'confidence', { unique: false });
    }

    // Create sessions store
    if (!db.objectStoreNames.contains('sessions')) {
        const store = db.createObjectStore('sessions', {
            keyPath: 'id',
        });
        store.createIndex('timestamp', 'timestamp', { unique: false });
        store.createIndex('title', 'title', { unique: false });
    }
}

// Open the database
const dbPromise = openDB('BusinessAnalysisPortal', 1, {
    upgrade(db) {
        createDatabase(db);
    },
});

export default dbPromise;