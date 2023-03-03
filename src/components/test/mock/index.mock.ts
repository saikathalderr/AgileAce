import { IEstimate, IUser } from '../../../interfaces';

export const mockUser: IUser = {
  userId: '123',
  roomId: '456',
  visibility: false,
  fullName: 'test',
  lastName: 'test',
};

export const mockUserEstimate: IEstimate = {
  estimate: '1',
  userId: '123',
  roomId: '456',
  show: false,
};
