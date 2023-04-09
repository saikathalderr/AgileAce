import {
  firestoreDeleteEstimations,
  firestoreToggleEstimationsVisibility,
} from '../firebase/room';
import { IEstimate } from '../interfaces';
import CardItem from './cardItem';
import { Delete } from '@mui/icons-material';
import { Button, Divider, Stack } from '@mui/material';

function CardList({
  userId,
  roomId,
  estimates,
}: {
  userId: string;
  roomId: string;
  estimates: IEstimate[];
}) {
  const cardsArray = ['0', '½', '1', '2', '3', '5', '8', '13', '20', '40', '100', '?'];
  const isCardActive = (estimate: string): Boolean => {
    return !!estimates.find(
      (e: IEstimate) => e.estimate === estimate && e.userId === userId
    );
  };

  const activeCardId =
    estimates.find((e: IEstimate) => e.userId === userId)?.estimateId || '';

  const onShow = () => {
    firestoreToggleEstimationsVisibility({ roomId, show: true });
  };

  const onReset = () => {
    firestoreDeleteEstimations({ roomId });
  };
  return (
    <>
      <div className='card-wrapper'>
        {cardsArray.map((card: string, idx: number) => (
          <CardItem
            key={card + idx + 1}
            label={card}
            active={isCardActive(card)}
            activeCardId={activeCardId}
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
        <Button variant='contained' color='error' onClick={onReset} endIcon={<Delete />}>
          Reset
        </Button>
      </Stack>
    </>
  );
}

export default CardList;
