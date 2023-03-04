import {
  fireEvent,
  render
} from '@testing-library/react';
import BackButton from '../backButton';
import { describe, vi } from 'vitest';

const mockUseNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockUseNavigate,
}));

describe('backButton.tsx', async () => {
  test('Should render Back button & icon is present', () => {
    const { getByTestId } = render(<BackButton />);
    expect(getByTestId('backButton')).toBeInTheDocument();
    expect(getByTestId('arrowBackIcon')).toBeInTheDocument();
  });

  test('clicking the button triggers navigation', () => {
    const { getByTestId } = render(<BackButton />);

    const backButton = getByTestId('backButton');
    fireEvent.click(backButton);

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith(-1);
  });
});
