import { fireEvent, render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import JoinRoom from '../joinRoom';
import { vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  return {
    ...vi.importMock('react-router-dom'),
    useSearchParams: () => [new URLSearchParams({ roomId: '1234' })],
    useNavigate: vi.fn(),
    Link: vi.fn(),
  };
});

describe('joinRoom.tsx', () => {
  test('Should and display right content', () => {
    render(<JoinRoom />);

    expect(screen.getByTestId('headingText')).toHaveTextContent(
      'Join the poker room with your team'
    );
    expect(screen.getByTestId('fullNameInput')).toBeInTheDocument();
    expect(screen.getByTestId('roomIdInput')).toBeInTheDocument();
    expect(screen.getByTestId('joinButton')).toBeInTheDocument();
    expect(screen.getByTestId('divider')).toBeInTheDocument();
    expect(screen.getByTestId('orChip')).toBeInTheDocument();
    expect(
      screen.getByTestId('createButtonContainer')
    ).toBeInTheDocument();
  });

  test('Should return name error if no name passed', async () => {
    render(<JoinRoom />);

    const joinButton = screen.getByTestId('joinButton');

    fireEvent.click(joinButton);
    expect(screen.getByTestId('nameErrorText')).toBeInTheDocument();
  });
});
