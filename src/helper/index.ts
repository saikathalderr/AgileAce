import { IUser } from '../interfaces';

export function storeUserInLocalStorage(payload: IUser) {
  const { roomId } = payload;
  localStorage.setItem(roomId, JSON.stringify(payload));
  return payload;
}

export function getUserFromLocalStorage(roomId: string): IUser {
  const data: any = localStorage.getItem(roomId);
  return JSON.parse(data);
}

export function removeUserFromLocalStorage(roomId: string) {
  return localStorage.removeItem(roomId);
}
