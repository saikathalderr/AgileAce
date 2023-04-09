import CardList from '../components/cardList';
import Header from '../components/header';
import Loading from '../components/loading';
import UsersList from '../components/usersList';
import { db } from '../firebase';
import {
  ESTIMATIONS_COLLECTION,
  ROOMS_COLLECTION,
  USERS_COLLECTION,
} from '../firebase/collections';
import { firestoreDeleteUser, firestoreToggleUserVisibility } from '../firebase/room';
import { getUserFromLocalStorage, removeUserFromLocalStorage } from '../helper';
import usePageVisibility from '../hooks/usePageVisibility';
import { IEstimate, IUser } from '../interfaces';
import { Box, Container } from '@mui/material';
import { collection, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Room = () => {
  const navigate = useNavigate();
  const roomId = useParams().roomId || '';

  const [localUser, setLocalUser] = useState(getUserFromLocalStorage(String(roomId)));
  const [showEstimates, setShowEstimates] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const pageVisibilityStatus = usePageVisibility();
  const [estimates, setEstimates] = useState<IEstimate[]>([]);

  const onLeave = async () => {
    if (confirm('Are you sure you want to leave the room?')) {
      await firestoreDeleteUser({ roomId, userId: localUser?.userId || '' });
      removeUserFromLocalStorage(roomId);
      setLocalUser(undefined);
      navigate('/');
    }
  };

  const [usersSnapshot, loadingUsers, errorLoadingUsers] = useCollection(
    collection(db, ROOMS_COLLECTION, roomId, USERS_COLLECTION),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [estimatesSnapshot, loadingEstimates, errorLoadingEstimates] = useCollection(
    collection(db, ROOMS_COLLECTION, roomId, ESTIMATIONS_COLLECTION),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [estimateVisibility, loadingEstimateVisibility, errorLoadingEstimateVisibility] =
    useDocument(doc(db, ROOMS_COLLECTION, roomId), {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

  useEffect(() => {
    setShowEstimates(estimateVisibility?.data()?.showEstimates);
  }, [estimateVisibility]);

  useEffect(() => {
    if (errorLoadingUsers || errorLoadingEstimates || errorLoadingEstimateVisibility) {
      toast.error('Something went wrong fetching room!.');
      navigate('/');
    }
  }, [errorLoadingUsers || errorLoadingEstimates || errorLoadingEstimateVisibility]);

  useEffect(() => {
    if (loadingUsers) return;
    const users =
      usersSnapshot?.docs.map((doc) => {
        return { ...doc.data(), userId: doc.id } as IUser;
      }) || [];
    setUsers(users);
  }, [usersSnapshot]);

  useEffect(() => {
    if (loadingEstimates) return;
    const estimates =
      estimatesSnapshot?.docs.map((doc) => {
        return { ...doc.data(), estimateId: doc.id } as IEstimate;
      }) || [];
    setEstimates(estimates);
  }, [estimatesSnapshot]);

  useEffect(() => {
    if (!localUser) return;
    firestoreToggleUserVisibility({
      roomId,
      userId: localUser.userId,
      visibility: pageVisibilityStatus,
    });
  }, [pageVisibilityStatus]);

  if (!localUser) navigate(`/join-room?roomId=${roomId}`);
  if (loadingUsers || loadingEstimates || loadingEstimateVisibility) return <Loading />;

  return (
    <>
      <Container sx={{ width: '1080px', pb: 10 }} data-testid='roomPageContainer'>
        <Box>
          <Header roomId={String(roomId)} onLeave={onLeave} data-testid={'roomHeader'} />

          <CardList
            data-testid={'roomCardList'}
            userId={localUser?.userId || ''}
            roomId={String(roomId)}
            estimates={estimates}
          />

          <UsersList
            data-testid={'roomUsersList'}
            users={users}
            estimates={estimates}
            showEstimates={showEstimates}
          />
        </Box>
      </Container>
    </>
  );
};

export default Room;
