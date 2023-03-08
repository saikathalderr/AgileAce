import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { useContext, useState } from 'react';
import SocketContext from '../context/socket';
import { getUserFromLocalStorage } from '../helper';
import { IEstimate } from '../interfaces';
import { giveEstimateEvent} from '../events';

export default function CardItem({
  label,
  active,
}: {
  label: string;
  active: Boolean;
}) {
  const { roomId } = useParams();
  const io: Socket = useContext(SocketContext);
  const [localUser, setLocalUser] = useState(
    getUserFromLocalStorage(String(roomId))
  );

  const giveEstimate = (estimate: string) => {
    const payload: IEstimate = {
      roomId: roomId || '',
      userId: localUser?.userId || '',
      estimate,
    };
    io.emit(giveEstimateEvent, payload);
  };

  return (
    <motion.div
      whileHover={{ translateY: -30 }}
      whileTap={{ scale: 0.9 }}
      className={active ? 'card active' : 'card'}
      onClick={() => giveEstimate(label)}
    >
      {label}
    </motion.div>
  );
}
