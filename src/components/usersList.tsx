import { IEstimate, IUser } from '../interfaces';
import UserItem from './userItem';
import { useEffect } from 'react';

function UsersList({
  users,
  estimates,
  roomId,
}: {
  users: IUser[];
  estimates: IEstimate[];
  roomId: string;
}) {
  function checkEstimationStatus({ userId }: { userId: string }) {
    return estimates.find(
      (estimate: IEstimate) =>
        estimate.userId === userId && estimate.roomId === roomId
    );
  }

  function getUserEstimate({
    userId,
  }: {
    userId: string;
  }): IEstimate | undefined {
    return estimates.find(
      (estimate: IEstimate) =>
        estimate.userId === userId && estimate.roomId === roomId
    );
  }
  return (
    <ul>
      {users.map((user: IUser) => {
        return (
          <UserItem
            key={user.userId}
            user={user}
            hasEstimated={
              !!checkEstimationStatus({ userId: user.userId })
            }
            userEstimate={getUserEstimate({ userId: user.userId })}
          />
        );
      })}
    </ul>
  );
}

export default UsersList;
