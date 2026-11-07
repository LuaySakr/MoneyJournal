// tests/api/guestbook.test.js
const request = require('supertest');
const app = require('../../src/pages/api/guestbook.js');
const admin = require('firebase-admin');

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  firestore: () => ({
    collection: jest.fn().mockReturnThis(),
    add: jest.fn(() => Promise.resolve({})),
    FieldValue: {
      serverTimestamp: jest.fn(),
    },
  }),
}));

describe('Guestbook API', () => {
  test('should validate input and return errors for invalid data', async () => {
    const response = await request(app).post('/api/guestbook').send({
      name: '',
      message: '',
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.errors).toContain('"name" is not allowed to be empty');
    expect(response.body.errors).toContain('"message" is not allowed to be empty');
  });

  test('should store a valid message in Firestore', async () => {
    const response = await request(app).post('/api/guestbook').send({
      name: 'John Doe',
      message: 'Hello, world!',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Message added successfully');
  });

  test('should handle Firestore errors gracefully', async () => {
    const errorMessage = 'Firestore error';
    admin.firestore().add.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
    
    const response = await request(app).post('/api/guestbook').send({
      name: 'Jane Doe',
      message: 'Testing error handling!',
    });
    expect(response.statusCode).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Internal Server Error');
  });
});

