import { IEstimate, IUser } from '../interfaces';
import UserVisibility from './userVisibility';
import { TableCell, TableRow } from '@mui/material';

function userItem({
  user,
  userEstimate,
  hasEstimated,
  showEstimates,
}: {
  user: IUser;
  userEstimate: IEstimate | undefined;
  hasEstimated: Boolean;
  showEstimates: Boolean;
}) {
  return (
    <TableRow data-testid='userTableRow'>
      <TableCell data-testid='userNameCell'> {user.fullName}</TableCell>
      <TableCell data-testid='userVisibilityCell'>
        <UserVisibility visibility={user.visibility} />
      </TableCell>
      <TableCell sx={{ pl: 4 }} data-testid='userEstimateCell'>
        {showEstimates ? (
          <div className='small-card' data-testid='estimateCard'>
            {userEstimate?.estimate}
          </div>
        ) : hasEstimated ? (
          <div className='small-card active' data-testid='estimatedCard'></div>
        ) : (
          <div className='small-card' data-testid='idleCard'>
            -
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}

export default userItem;
