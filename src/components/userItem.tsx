import { IUser } from '../interfaces';
import UserVisibility from './userVisibility';

function userItem({ user }: { user: IUser }) {
  return (
    <li>
      {user.fullName} -{' '}
      <UserVisibility visibility={user.visibility} />
    </li>
  );
}

export default userItem;
