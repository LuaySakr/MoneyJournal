import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

function GuestbookForm({ apiEndpoint }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ name: '', message: '' });
  const [submissionStatus, setSubmissionStatus] = useState('');

  const validateForm = () => {
    const newErrors = { name: '', message: '' };
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (message.length < 10) newErrors.message = 'Message must be at least 10 characters.';
    setErrors(newErrors);
    return !newErrors.name && !newErrors.message;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(apiEndpoint, { name, message });
      setSubmissionStatus('Message submitted successfully!');
      setName('');
      setMessage('');
    } catch (error) {
      setSubmissionStatus('Error submitting message. Please try again.');
    }
  };

  return (
    <form onSubmit={submitForm} style={formStyle}>
      <div style={fieldStyle}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />
        {errors.name && <p style={errorStyle}>{errors.name}</p>}
      </div>
      <div style={fieldStyle}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={textareaStyle}
        />
        {errors.message && <p style={errorStyle}>{errors.message}</p>}
      </div>
      <button type="submit" style={buttonStyle}>
        Submit
      </button>
      {submissionStatus && <p>{submissionStatus}</p>}
    </form>
  );
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px',
  margin: '0 auto',
};

const fieldStyle = {
  marginBottom: '1rem',
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
};

const textareaStyle = {
  width: '100%',
  padding: '0.5rem',
  height: '100px',
};

const buttonStyle = {
  padding: '0.5rem',
};

const errorStyle = {
  color: 'red',
  fontSize: '0.8rem',
};

GuestbookForm.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
};

export default GuestbookForm;
