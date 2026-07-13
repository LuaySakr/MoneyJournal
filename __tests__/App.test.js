import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../src/App';

test('renders welcome text', () => {
  const { getByText } = render(<App />);
  const welcomeText = getByText(/Welcome to Money Journal!/i);
  expect(welcomeText).toBeTruthy();
});