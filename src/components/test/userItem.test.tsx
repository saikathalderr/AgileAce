import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserItem from '../userItem';
import { mockUser, mockUserEstimate } from './mock/index.mock';
import { IEstimate } from '../../interfaces';
describe('userItem.tsx', () => {
  test('Load and display necessary content', () => {
    render(
      <UserItem
        user={mockUser}
        userEstimate={mockUserEstimate}
        hasEstimated={false}
      />
    );
    expect(screen.getByTestId('userTableRow')).toBeTruthy();
    expect(screen.getByTestId('userNameCell')).toBeTruthy();
    expect(screen.getByTestId('userVisibilityCell')).toBeTruthy();
    expect(screen.getByTestId('userEstimateCell')).toBeTruthy();
    expect(screen.getByTestId('idleCard')).toBeTruthy();
  });

  test('Show estimateCard', () => {
    const mockUserEstimated: IEstimate = mockUserEstimate;
    mockUserEstimated.show = true;
    render(
      <UserItem
        user={mockUser}
        userEstimate={mockUserEstimated}
        hasEstimated={false}
      />
    );
    expect(screen.getByTestId('estimateCard')).toBeTruthy();
  });

  test('Show estimatedCard', () => {
    const mockUserEstimated: IEstimate = mockUserEstimate;
    mockUserEstimated.show = false;
    render(
      <UserItem
        user={mockUser}
        userEstimate={mockUserEstimated}
        hasEstimated={true}
      />
    );
    expect(screen.getByTestId('estimatedCard')).toBeTruthy();
  });
});
