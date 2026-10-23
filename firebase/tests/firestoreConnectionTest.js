// Test script to verify a connection to Firestore
import { expect } from 'chai';
import { addGuestbookMessage } from '../init.js';

describe('Firestore Connection', () => {
  it('should add a new guestbook message without failure', async () => {
    const name = "John Doe";
    const message = "Hello world!";
    
    try {
      await addGuestbookMessage(name, message);
      expect(true).to.be.true;
    } catch (e) {
      expect.fail("Failed to add message to Firestore");
    }
  });
});
