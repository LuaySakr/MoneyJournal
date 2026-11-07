import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GuestbookForm from './GuestbookForm';
import axios from 'axios';

jest.mock('axios');

describe('GuestbookForm', () => {
  const apiEndpoint = 'http://localhost/api/messages';
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly', () => {
    const { getByLabelText, getByText } = render(<GuestbookForm apiEndpoint={apiEndpoint} />);
    expect(getByLabelText(/Name/i)).toBeInTheDocument();
    expect(getByLabelText(/Message/i)).toBeInTheDocument();
    expect(getByText(/Submit/i)).toBeInTheDocument();
  });

  test('validates input and displays error messages', () => {
    render(<GuestbookForm apiEndpoint={apiEndpoint} />);
    fireEvent.click(screen.getByText(/Submit/i));

    expect(screen.getByText(/Name is required./i)).toBeVisible();
    expect(screen.getByText(/Message must be at least 10 characters./i)).toBeVisible();
  });

  test('submits the form successfully', async () => {
    axios.post.mockResolvedValueOnce({});
    render(<GuestbookForm apiEndpoint={apiEndpoint} />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'This is a test message.' } });
    fireEvent.click(screen.getByText(/Submit/i));

    expect(await screen.findByText(/Message submitted successfully!/i)).toBeVisible();
    expect(screen.getByLabelText(/Name/i).value).toBe('');
    expect(screen.getByLabelText(/Message/i).value).toBe('');
  });

  test('handles submission errors', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network Error'));
    render(<GuestbookForm apiEndpoint={apiEndpoint} />);

    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'This is another test message.' } });
    fireEvent.click(screen.getByText(/Submit/i));

    expect(await screen.findByText(/Error submitting message. Please try again./i)).toBeVisible();
  });
});
