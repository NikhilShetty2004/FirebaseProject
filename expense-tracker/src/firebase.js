import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, initializeFirestore } from 'firebase/firestore';
import { enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDwT_7ole_8UA9qYzXFRumqSC26QxWh5oU",
  authDomain: "transaction-1b2e9.firebaseapp.com",
  projectId: "transaction-1b2e9",
  storageBucket: "transaction-1b2e9.firebasestorage.app",
  messagingSenderId: "544863021522",
  appId: "1:544863021522:web:af4414edd10e6d888b000b",
  measurementId: "G-LGGN0XPPZB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Firestore with improved settings
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
  cacheSizeBytes: 50000000 // 50MB cache size
});

// Enable offline persistence
try {
  enableIndexedDbPersistence(db);
} catch (err) {
  if (err.code === 'failed-precondition') {
    console.warn('Persistence failed: multiple tabs open');
  } else if (err.code === 'unimplemented') {
    console.warn('Browser doesn\'t support persistence');
  }
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;