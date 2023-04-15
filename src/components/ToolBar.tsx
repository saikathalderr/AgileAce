import { useFirebaseAuth } from '../firebase/context/auth.context';
import User from './User';
import BackButton from './backButton';
import HomeButton from './homeButton';
import { Box, Stack } from '@mui/material';

function ToolBar() {
  const { user } = useFirebaseAuth();

  return (
    <>
      <Box sx={{ mb: 5 }} data-testid='actionsContainer'>
        <Stack spacing={1} direction='row' alignItems={'center'}>
          <BackButton />
          <HomeButton />
          {user ? <User /> : null}
        </Stack>
      </Box>
    </>
  );
}

export default ToolBar;
