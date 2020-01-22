import { firestore, initializeApp, storage, remoteConfig } from 'firebase';
import { firebaseConfig } from './firebaseConfig';

// Initialize Firebase
initializeApp(firebaseConfig);

export const remoteConfigObj = remoteConfig();

remoteConfigObj.settings = {
  minimumFetchIntervalMillis: 3600000,
};

const databaseRef = firestore();
export const videosRef = databaseRef.collection('videos');
export const usersRef = databaseRef.collection('users');
export const storageRef = storage().ref();
