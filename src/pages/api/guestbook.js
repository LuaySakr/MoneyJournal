// src/pages/api/guestbook.js
const express = require('express');
const admin = require('firebase-admin');
const Joi = require('joi');

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(express.json());

const messageSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  message: Joi.string().min(1).max(200).required(),
});

app.post('/api/guestbook', async (req, res) => {
  const { error, value } = messageSchema.validate(req.body, { abortEarly: false });
  
  if (error) {
    return res.status(400).json({ success: false, errors: error.details.map(e => e.message) });
  }

  try {
    const { name, message } = value;
    await db.collection('guestbook').add({
      name,
      message,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });
    return res.status(200).json({ success: true, message: 'Message added successfully' });
  } catch (err) {
    console.error('Error writing to Firestore', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = app;
