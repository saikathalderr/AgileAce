import { describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import JoinRoomPage from '../joinRoomPage';

vi.mock('@lottiefiles/react-lottie-player', async () => {
  return {
    ...vi.importMock('@lottiefiles/react-lottie-player'),
    Player: vi.fn(),
  };
});
vi.mock('react-router-dom', async () => {
  return {
    ...vi.importMock('react-router-dom'),
    useSearchParams: () => [new URLSearchParams({ roomId: '1234' })],
    useNavigate: vi.fn(),
    Link: vi.fn(),
  };
});
describe('joinRoomPage.tsx', () => {
  test('Should Load and display right content', () => {
    render(<JoinRoomPage />);

    expect(
      screen.getByTestId('joinRoomContainer')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('animationContainer')
    ).toBeInTheDocument();
  });
});
