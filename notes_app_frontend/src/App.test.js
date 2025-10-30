import { render, screen } from '@testing-library/react';
import App from './App';

test('renders brand or add button', () => {
  render(<App />);
  const brand = screen.getByText(/Personal Notes/i);
  expect(brand).toBeInTheDocument();
});
