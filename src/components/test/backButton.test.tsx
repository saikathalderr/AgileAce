import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import BackButton from '../backButton';
import { describe, vi } from 'vitest';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  return {
    ...vi.importMock('react-router-dom'),
    useNavigate: vi.fn(),
  };
});
describe('backButton.tsx', async () => {
  render(<BackButton />);
  test('Back button & icon is present', () => {
    expect(screen.getByTestId('backButton')).toBeTruthy();
    expect(screen.getByTestId('arrowBackIcon')).toBeTruthy();
  });
});
