import CreateRoomPage from '../createRoomPage';
import { render, screen } from '@testing-library/react';
import { describe, vi } from 'vitest';

vi.mock('@lottiefiles/react-lottie-player', async () => {
  return {
    ...vi.importMock('@lottiefiles/react-lottie-player'),
    Player: vi.fn(),
  };
});
vi.mock('react-router-dom', async () => {
  return {
    ...vi.importMock('react-router-dom'),
    useNavigate: vi.fn(),
    Link: vi.fn(),
  };
});
describe('createRoomPage.tsx', () => {
  test('Should Load and display right content', () => {
    render(<CreateRoomPage />);

    expect(screen.getByTestId('createRoomContainer')).toBeInTheDocument();
    expect(screen.getByTestId('animationContainer')).toBeInTheDocument();
  });
});
