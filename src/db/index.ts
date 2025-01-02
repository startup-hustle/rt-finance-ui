import { openDB } from 'idb';

const DB_NAME = 'expenseTrackerDB';
const DB_VERSION = 1;

export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Settings store
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings');
      }

      // EMIs store
      if (!db.objectStoreNames.contains('emis')) {
        const emisStore = db.createObjectStore('emis', { keyPath: 'id', autoIncrement: true });
        emisStore.createIndex('name', 'name');
      }

      // Bills store
      if (!db.objectStoreNames.contains('bills')) {
        const billsStore = db.createObjectStore('bills', { keyPath: 'id', autoIncrement: true });
        billsStore.createIndex('name', 'name');
      }

      // Expenses store
      if (!db.objectStoreNames.contains('expenses')) {
        const expensesStore = db.createObjectStore('expenses', { keyPath: 'id', autoIncrement: true });
        expensesStore.createIndex('date', 'date');
      }
    },
  });

  return db;
};

export const db = initDB();