import {
  fireEvent,
  render
} from '@testing-library/react';
import HomeButton from '../homeButton';
import { describe, vi } from 'vitest';

const mockUseNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockUseNavigate,
}));

describe('homeButton.tsx', async () => {
  test('Should render Back button & icon is present', () => {
    const { getByTestId } = render(<HomeButton />);
    expect(getByTestId('homeButton')).toBeInTheDocument();
    expect(getByTestId('homeIcon')).toBeInTheDocument();
  });

  test('clicking the button triggers navigation', () => {
    const { getByTestId } = render(<HomeButton />);

    const homeButton = getByTestId('homeButton');
    fireEvent.click(homeButton);

    expect(mockUseNavigate).toHaveBeenCalledTimes(1);
    expect(mockUseNavigate).toHaveBeenCalledWith('/');
  });
});
