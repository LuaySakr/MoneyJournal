import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

test('renders welcome message', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Welcome to Money Journal/i);
  expect(linkElement).toBeTruthy();
});