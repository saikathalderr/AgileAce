import StarIcon from '@mui/icons-material/Star';
import { Fab, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const FabButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(10),
  right: theme.spacing(5),
}));

function ReviewButton() {
  const tooltipText =
    'Please review this app based on your experience, and help us improve it. Thank you!';

  return (
    <Link to={'/feedbacks'}>
      <Tooltip title={tooltipText} aria-label='review'>
        <FabButton variant='extended' color='secondary'>
          <StarIcon sx={{ mr: 1 }} />
          Review
        </FabButton>
      </Tooltip>
    </Link>
  );
}

export default ReviewButton;
