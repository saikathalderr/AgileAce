import { IUser } from '../interfaces';
import UserItem from './userItem';

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
