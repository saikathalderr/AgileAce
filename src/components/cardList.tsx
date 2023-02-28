import CardItem from './cardItem';
import { IEstimate } from '../interfaces';
import { Socket } from 'socket.io-client';
import { useContext } from 'react';
import SocketContext from '../context/socket';
import {
  resetEstimatesEvent,
  toggleEstimateVisibilityEvent,
} from '../events';
import { Button, Divider, Stack } from '@mui/material';
import { Delete } from '@mui/icons-material';

function CardList({
  userId,
  roomId,
  estimates,
}: {
  userId: string;
  roomId: string;
  estimates: IEstimate[];
}) {
  const io: Socket = useContext(SocketContext);

  const cardsArray = [
    '0',
    '½',
    '1',
    '2',
    '3',
    '5',
    '8',
    '13',
    '20',
    '40',
    '100',
    '?',
  ];
  const isCardActive = (estimate: string): Boolean => {
    return !!estimates.find(
      (e: IEstimate) => e.estimate === estimate && e.userId === userId
    );
  };

  const onShow = () => {
    io.emit(toggleEstimateVisibilityEvent, { roomId });
  };

  const onReset = () => {
    io.emit(resetEstimatesEvent, { roomId });
  };
  return (
    <>
      <div className='card-wrapper'>
        {cardsArray.map((card: string, idx: number) => (
          <CardItem
            key={card + idx + 1}
            label={card}
            active={isCardActive(card)}
          />
        ))}
      </div>

      <Divider sx={{ my: 5 }} />

      <Stack
        spacing={1}
        direction='row'
        alignItems='center'
        justifyContent='flex-end'
        divider={<Divider orientation='vertical' flexItem />}
      >
        <Button variant='contained' onClick={onShow}>
          Show
        </Button>
        <Button
          variant='contained'
          color='error'
          onClick={onReset}
          endIcon={<Delete />}
        >
          Reset
        </Button>
      </Stack>
    </>
  );
}

export default CardList;
