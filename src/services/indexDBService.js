import dbPromise from "./idb";



// Insert a message
export const insertMessage = async (message) => {
    try {
        const db = await dbPromise;
        const tx = db.transaction('messages', 'readwrite');
        const store = tx.objectStore('messages');
        const result = await store.put({
            ...message,
            timestamp: message.timestamp || new Date().toISOString()
        });
        await tx.done;
        return { success: true, id: result };
    } catch (error) {
        console.error('Error inserting message:', error);
        return { success: false, message: 'Error inserting message' };
    }
};

// Get messages by session ID
export const getMessagesBySession = async (sessionId) => {
    try {
        const db = await dbPromise;
        const tx = db.transaction('messages', 'readonly');
        const store = tx.objectStore('messages');
        const index = store.index('sessionId');
        const messages = await index.getAll(sessionId);
        await tx.done;
        return { success: true, data: messages };
    } catch (error) {
        console.error('Error reading messages:', error);
        return { success: false, message: 'Error reading messages' };
    }
};

// Insert a session
export const insertSession = async (session) => {
    try {
        const db = await dbPromise;
        const tx = db.transaction('sessions', 'readwrite');
        const store = tx.objectStore('sessions');
        await store.put({
            ...session,
            timestamp: session.timestamp || new Date().toISOString()
        });
        await tx.done;
        return { success: true };
    } catch (error) {
        console.error('Error inserting session:', error);
        return { success: false, message: 'Error inserting session' };
    }
};

// Get all sessions
export const getSessions = async () => {
    try {
        const db = await dbPromise;
        const tx = db.transaction('sessions', 'readonly');
        const store = tx.objectStore('sessions');
        const sessions = await store.getAll();
        await tx.done;
        return { success: true, data: sessions };
    } catch (error) {
        console.error('Error reading sessions:', error);
        return { success: false, message: 'Error reading sessions' };
    }
};

// Clear old messages (older than 30 days)
export const clearOldMessages = async () => {
    try {
        const db = await dbPromise;
        const tx = db.transaction('messages', 'readwrite');
        const store = tx.objectStore('messages');
        const index = store.index('timestamp');

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const request = index.openCursor(IDBKeyRange.upperBound(thirtyDaysAgo.toISOString()));

        await new Promise((resolve, reject) => {
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    cursor.delete();
                    cursor.continue();
                } else {
                    resolve();
                }
            };
            request.onerror = () => reject(request.error);
        });

        await tx.done;
        return { success: true };
    } catch (error) {
        console.error('Error clearing old messages:', error);
        return { success: false, message: 'Error clearing old messages' };
    }
};

