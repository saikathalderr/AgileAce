import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import HomeButton from '../homeButton';
import { describe, vi } from 'vitest';
import { useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  return {
    ...vi.importMock('react-router-dom'),
    useNavigate: vi.fn(),
  };
});
describe('homeButton.tsx', async () => {
  render(<HomeButton />);
  test('Back button & icon is present', () => {
    expect(screen.getByTestId('homeButton')).toBeTruthy();
    expect(screen.getByTestId('homeIcon')).toBeTruthy();
  });
});
