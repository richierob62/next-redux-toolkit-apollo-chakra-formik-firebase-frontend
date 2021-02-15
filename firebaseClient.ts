import firebase from 'firebase';

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyAf50j_1qtRcw-TozCOUHWx14rbjaJ8Ktk',
  authDomain: 'nextjs-firebase-auth-ec05a.firebaseapp.com',
  projectId: 'nextjs-firebase-auth-ec05a',
  storageBucket: 'nextjs-firebase-auth-ec05a.appspot.com',
  messagingSenderId: '853905106648',
  appId: '1:853905106648:web:86fb84065601141d8999ad',
};

const firebaseClient = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
};

export default firebaseClient;
