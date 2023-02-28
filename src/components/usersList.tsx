import { IEstimate, IUser } from '../interfaces';
import UserItem from './userItem';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

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
    <div>
      <Typography variant='h5'>
        <b>Users</b>
      </Typography>
      <TableContainer component={Paper} sx={{ my: 2 }}>
        <Table aria-label='Users Table'>
          <TableHead
            sx={{ minHeight: 50, maxHeight: 50, height: 50 }}
          >
            <TableRow>
              <TableCell>
                <b>Users</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
              <TableCell>
                <b>Estimate</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: IUser) => {
              return (
                <UserItem
                  key={user.userId}
                  user={user}
                  hasEstimated={
                    !!checkEstimationStatus({ userId: user.userId })
                  }
                  userEstimate={getUserEstimate({
                    userId: user.userId,
                  })}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UsersList;
