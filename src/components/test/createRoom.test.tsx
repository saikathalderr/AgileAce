import { fireEvent, render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import CreateRoom from '../createRoom';
import { vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  return {
    ...vi.importMock('react-router-dom'),
    useNavigate: vi.fn(),
    Link: vi.fn(),
  };
});
describe('createRoom.tsx', () => {
  test('Load and display right content', () => {
    render(<CreateRoom />);

    expect(screen.getByTestId('headingText')).toHaveTextContent(
      'Create A new poker room & join with your team'
    );
    expect(
      screen.getByTestId('joinButtonContainer')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('actionsContainer')
    ).toBeInTheDocument();
    expect(screen.getByTestId('fullNameInput')).toBeInTheDocument();
    expect(screen.getByTestId('createButton')).toBeInTheDocument();
    expect(screen.getByTestId('divider')).toBeInTheDocument();
    expect(screen.getByTestId('orChip')).toBeInTheDocument();
  });

  test('show error if no name passed', async () => {
    render(<CreateRoom />);

    const createButton = screen.getByTestId('createButton');
    fireEvent.click(createButton);

    expect(screen.getByTestId('errorText')).toBeInTheDocument();
    expect(screen.getByTestId('errorText')).toHaveTextContent(
      'Please provide a name'
    );
    expect(createButton).toBeDisabled();
  });
});
