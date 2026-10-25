// src/utils/firebase.test.js

import { initializeFirebase, getFirebaseAuth, getFirebaseFirestore } from './firebase';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
}));

describe('Firebase Initialization Utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initializeFirebase should initialize Firebase app', () => {
    initializeFirebase();
    expect(require('firebase/app').initializeApp).toHaveBeenCalled();
  });

  test('getFirebaseAuth should return Auth instance', () => {
    initializeFirebase();
    const auth = getFirebaseAuth();
    expect(getAuth).toHaveBeenCalledWith(require('firebase/app').initializeApp());
    expect(auth).toBeDefined();
  });

  test('getFirebaseFirestore should return Firestore instance', () => {
    initializeFirebase();
    const firestore = getFirebaseFirestore();
    expect(getFirestore).toHaveBeenCalledWith(require('firebase/app').initializeApp());
    expect(firestore).toBeDefined();
  });

  test('should not reinitialize the Firebase app if already initialized', () => {
    require('firebase/app').getApps.mockReturnValue([{}]);
    initializeFirebase();
    expect(require('firebase/app').initializeApp).not.toHaveBeenCalled();
  });

  test('should handle initialization errors gracefully', () => {
    require('firebase/app').initializeApp.mockImplementation(() => {
      throw new Error('Initialization Error');
    });
    expect(() => initializeFirebase()).not.toThrow();
  });
});
