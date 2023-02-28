import { IEstimate, IUser } from '../interfaces';
import UserVisibility from './userVisibility';
import { TableCell, TableRow } from '@mui/material';

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
    <TableRow sx={{ minHeight: 50, maxHeight: 50, height: 50 }}>
      <TableCell> {user.fullName} </TableCell>
      <TableCell>
        <UserVisibility visibility={user.visibility} />
      </TableCell>
      <TableCell sx={{ pl: 4 }}>
        {userEstimate?.show ? (
          <div className='small-card'>{userEstimate.estimate}</div>
        ) : hasEstimated ? (
          <div className='small-card active'></div>
        ) : (
          <div className='small-card'>-</div>
        )}
      </TableCell>
    </TableRow>
  );
}

export default userItem;
