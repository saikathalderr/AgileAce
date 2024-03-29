import { IUser } from '../interfaces';

export function storeUserInLocalStorage({
  roomId,
  payload,
}: {
  roomId: string;
  payload: IUser;
}) {
  localStorage.setItem(roomId, JSON.stringify(payload));
  return payload;
}

export function getUserFromLocalStorage(roomId: string): IUser | undefined {
  const data: any = localStorage.getItem(roomId);
  return JSON.parse(data) || undefined;
}

export function removeUserFromLocalStorage(roomId: string) {
  return localStorage.removeItem(roomId);
}

export function exitAlert(e: any) {
  e.preventDefault();
  e.returnValue = '';
  console.log('yoo');
}
