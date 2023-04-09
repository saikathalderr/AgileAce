import RoomPage from '../room';
import { render, screen } from '@testing-library/react';
import { describe, vi } from 'vitest';

const mockUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  return {
    ...vi.importMock('react-router-dom'),
    useSearchParams: () => [new URLSearchParams({ roomId: '1234' })],
    useNavigate: () => mockUseNavigate,
    useParams: () => ({
      roomId: '1234',
    }),
    Link: vi.fn(),
  };
});
describe('room.tsx', () => {
  afterEach(() => {
    localStorage.clear();
  });
  test('Should display loading when their is no local user or Socket', () => {
    render(<RoomPage />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});
