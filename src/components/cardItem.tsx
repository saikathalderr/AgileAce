import {
  firestoreAddUserEstimation,
  firestoreUpdateUserEstimation,
} from '../firebase/room';
import { getUserFromLocalStorage } from '../helper';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function CardItem({
  label,
  active,
  activeCardId,
}: {
  label: string;
  active: Boolean;
  activeCardId: string;
}) {
  const roomId = useParams()?.roomId || '';
  const [localUser, setLocalUser] = useState(getUserFromLocalStorage(String(roomId)));

  const giveEstimate = (estimate: string) => {
    firestoreAddUserEstimation({
      roomId,
      userId: localUser?.userId || '',
      estimate,
    });
  };

  const updateEstimate = ({
    estimateId,
    estimate,
  }: {
    estimateId: string;
    estimate: string;
  }) => {
    firestoreUpdateUserEstimation({
      roomId,
      estimate,
      estimateId,
    });
  };

  const handleEstimation = (label: string) => {
    if (!activeCardId) giveEstimate(label);
    else
      updateEstimate({
        estimateId: activeCardId || '',
        estimate: label,
      });
  };

  return (
    <motion.div
      whileHover={{ translateY: -15 }}
      whileTap={{ scale: 0.9 }}
      className={active ? 'card active' : 'card'}
      onClick={() => handleEstimation(label)}
    >
      {label}
    </motion.div>
  );
}
