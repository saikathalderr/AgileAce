import { IEstimate, IUser } from '../interfaces';
import UserVisibility from './userVisibility';

function userItem({
  user,
  userEstimate,
  hasEstimated,
}: {
  user: IUser;
  userEstimate: IEstimate | undefined;
  hasEstimated: Boolean;
}) {
  return (
    <li>
      <UserVisibility visibility={user.visibility} /> {user.fullName}{' '}
      <span>
        {userEstimate?.show
          ? userEstimate.estimate
          : hasEstimated
          ? '✔'
          : ''}
      </span>
    </li>
  );
}

export default userItem;
