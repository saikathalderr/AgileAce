import { storeUserInLocalStorage } from '../../helper';
import { ICreateRoom } from '../../interfaces';
import {
  ESTIMATIONS_COLLECTION,
  ROOMS_COLLECTION,
  USERS_COLLECTION,
} from '../collections';
import { db } from '../index';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';

export const firestoreCreateNewRoom = async (room: ICreateRoom) => {
  try {
    const { fullName } = room;
    const docRefRoom = await addDoc(collection(db, ROOMS_COLLECTION), {
      showEstimates: false,
    });
    const docRefUser = await addDoc(
      collection(db, ROOMS_COLLECTION, docRefRoom.id, USERS_COLLECTION),
      {
        fullName,
        visibility: false,
      }
    );

    storeUserInLocalStorage({
      roomId: docRefRoom.id,
      payload: {
        fullName,
        userId: docRefUser.id,
      },
    });

    return docRefRoom.id;
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const firestoreJoinRoom = async ({
  roomId,
  fullName,
}: {
  roomId: string;
  fullName: string;
}) => {
  try {
    const docRefUser = await addDoc(
      collection(db, ROOMS_COLLECTION, roomId, USERS_COLLECTION),
      {
        fullName,
        visibility: false,
      }
    );

    storeUserInLocalStorage({
      roomId,
      payload: {
        fullName,
        userId: docRefUser.id,
      },
    });

    return docRefUser.id;
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const firestoreToggleUserVisibility = async ({
  roomId,
  userId,
  visibility,
}: {
  roomId: string;
  userId: string;
  visibility: boolean;
}) => {
  try {
    await updateDoc(doc(db, ROOMS_COLLECTION, roomId, USERS_COLLECTION, userId), {
      visibility,
    });
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export const firestoreAddUserEstimation = async ({
  roomId,
  userId,
  estimate,
}: {
  roomId: string;
  userId: string;
  estimate: string;
}) => {
  try {
    await addDoc(collection(db, ROOMS_COLLECTION, roomId, ESTIMATIONS_COLLECTION), {
      estimate,
      userId,
    });
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export const firestoreUpdateUserEstimation = async ({
  roomId,
  estimateId,
  estimate,
}: {
  roomId: string;
  estimateId: string;
  estimate: string;
}) => {
  try {
    await updateDoc(
      doc(db, ROOMS_COLLECTION, roomId, ESTIMATIONS_COLLECTION, estimateId),
      {
        estimate,
      }
    );
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export const firestoreToggleEstimationsVisibility = async ({
  roomId,
  show = true,
}: {
  roomId: string;
  show?: boolean;
}) => {
  try {
    await updateDoc(doc(db, ROOMS_COLLECTION, roomId), {
      showEstimates: show,
    });
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export const firestoreDeleteEstimations = async ({ roomId }: { roomId: string }) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, ROOMS_COLLECTION, roomId, ESTIMATIONS_COLLECTION)
    );
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
    await updateDoc(doc(db, ROOMS_COLLECTION, roomId), {
      showEstimates: false,
    });
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};

export const firestoreDeleteUser = async ({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    await deleteDoc(doc(db, ROOMS_COLLECTION, roomId, USERS_COLLECTION, userId));
  } catch (error) {
    console.error('Error updating document: ', error);
  }
};
