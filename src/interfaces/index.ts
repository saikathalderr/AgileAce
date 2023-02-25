export interface IRoom {
  fullName: string;
  roomId: string;
  userId: string;
}

export interface IUser {
  fullName: string;
  lastName?: string;
  roomId: string;
  userId: string;
  visibility?: boolean;
}

export interface ILeaveRoom {
  roomId: string;
  userId: string;
}

export interface IToggleUserVisibility {
  user: IUser;
  visibilityStatus: boolean;
}

export interface IEstimate {
  estimate: string;
  roomId: string;
  userId: string;
  show: Boolean;
}

export interface IRoomData {
  room: string;
  users: IUser[] | [];
  estimates: IEstimate[] | [];
}
