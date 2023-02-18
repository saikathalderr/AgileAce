export interface IRoom {
  fullName: string;
  roomId: string;
  userId: string;
}

export interface IUser {
  fullName: string;
  roomId: string;
  userId: string;
  visibility?: boolean;

}

export interface IToggleUserVisibility {
  user: IUser;
  visibilityStatus: boolean;
}
