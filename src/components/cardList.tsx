import CardItem from './cardItem';
import { IEstimate, IUser } from '../interfaces';
import Button from './button';
import { Socket } from 'socket.io-client';
import { useContext } from 'react';
import SocketContext from '../context/socket';
import {resetEstimatesEvent, toggleEstimateVisibilityEvent} from '../events';

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
    '∞',
    '☊',
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
    io.emit(resetEstimatesEvent, { roomId })
  }
  return (
    <>
      <div>
        <Button label={'Show'} handleClick={onShow} />
        <Button label={'Reset'} handleClick={onReset} />
      </div>
      <div
        style={{
          width: '350px',
        }}
      >
        {cardsArray.map((card: string, idx: number) => (
          <CardItem
            key={card + idx + 1}
            label={card}
            active={isCardActive(card)}
          />
        ))}
      </div>
    </>
  );
}

export default CardList;
