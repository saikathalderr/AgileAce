import { describe } from 'vitest';
import {
  storeUserInLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../index';
import { IUser } from '../../interfaces';

describe('Helper.ts', () => {
  afterEach(() => {
    localStorage.clear();
  });
  test('Should define', () => {
    expect(storeUserInLocalStorage).toBeDefined();
    expect(getUserFromLocalStorage).toBeDefined();
    expect(removeUserFromLocalStorage).toBeDefined();
  });

  test('should store the user in localStorage with the given roomId key', () => {
    // Arrange
    const user: IUser = {
      userId: '1',
      fullName: 'John Doe',
      roomId: 'room-1',
    };

    // Act
    const storedUser = storeUserInLocalStorage(user);

    // Assert
    const retrievedUser = JSON.parse(localStorage.getItem('room-1')!);
    expect(retrievedUser).toEqual(user);
    expect(storedUser).toEqual(user);
  });

  test('should return undefined if no user is found in localStorage', () => {
    // Arrange
    const roomId = 'room-1';

    // Act
    const result = getUserFromLocalStorage(roomId);

    // Assert
    expect(result).toBeUndefined();
  });

  test('should return the user object from localStorage if it exists', () => {
    // Arrange
    const user: IUser = {
      userId: '1',
      fullName: 'John Doe',
      roomId: 'room-1',
    };

    localStorage.setItem('room-1', JSON.stringify(user));

    // Act
    const result = getUserFromLocalStorage('room-1');

    // Assert
    expect(result).toEqual(user);
  });

  test('should remove the user from localStorage with the given roomId key', () => {
    // Arrange
    const user: IUser = {
      userId: '1',
      fullName: 'John Doe',
      roomId: 'room-1',
    };

    localStorage.setItem('room-1', JSON.stringify(user));

    // Act
    removeUserFromLocalStorage('room-1');

    // Assert
    const retrievedUser = JSON.parse(localStorage.getItem('room-1')!);
    expect(retrievedUser).toBeNull();
  });
});
