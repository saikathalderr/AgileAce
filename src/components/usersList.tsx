import { IUser } from '../interfaces';
import UserItem from './userItem';
import { useEffect } from 'react';

function UsersList({ users }: { users: IUser[] }) {
  return (
    <ul>
      {users.map((user: IUser) => {
        return <UserItem key={user.userId} user={user} />;
      })}
    </ul>
  );
}

export default UsersList;
