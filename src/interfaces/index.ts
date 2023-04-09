export interface IRoom {
  fullName: string;
  roomId: string;
}

export interface IUser {
  fullName: string;
  userId: string;
  visibility?: boolean;
}

export interface IEstimate {
  estimate: string;
  estimateId: string;
  userId: string;
}
export interface ICreateRoom {
  fullName: string;
}
