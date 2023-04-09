import loadingAnimation from '../lottiefiles/97952-loading-animation-blue.json';
import { Player } from '@lottiefiles/react-lottie-player';
import { Box } from '@mui/material';

const Loading = () => {
  return (
    <div data-testid='loading'>
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <Player autoplay loop src={loadingAnimation} />
      </Box>
    </div>
  );
};

export default Loading;
