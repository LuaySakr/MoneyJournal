// src/utils/firebase.js

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import * as Sentry from '@sentry/react';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

let firebaseApp = null;

const initializeFirebase = () => {
  if (getApps().length === 0) {
    try {
      firebaseApp = initializeApp(firebaseConfig);
      console.log('Firebase initialized');
    } catch (error) {
      Sentry.captureException(error);
      console.error('Firebase initialization error:', error);
    }
  }
  return firebaseApp;
};

const getFirebaseAuth = () => {
  if (!firebaseApp) {
    initializeFirebase();
  }
  return getAuth(firebaseApp);
};

const getFirebaseFirestore = () => {
  if (!firebaseApp) {
    initializeFirebase();
  }
  return getFirestore(firebaseApp);
};

export {
  initializeFirebase,
  getFirebaseAuth,
  getFirebaseFirestore,
};
