import { navigate } from '@reach/router';

const config = {
  apiKey: 'AIzaSyBJwGdhiCk3-6oUyYnYuhiWt6d8w7dnV-o',
  authDomain: 'c-dailyreport.firebaseapp.com',
  databaseURL: 'https://c-dailyreport.firebaseio.com',
  projectId: 'c-dailyreport',
  storageBucket: 'c-dailyreport.appspot.com',
  messagingSenderId: '151835344130',
  appId: '1:151835344130:web:3547aa4d7be19c0b61d61b',
  measurementId: 'G-3FT2M8E0GB',
};

let firebaseCache;

export const getUiConfig = firebase => ({
  signInFlow: 'popup',
  callbacks: {
    signInSuccess: () => {
      navigate('/dashboard');
    },
  },
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
});

const getFirebase = firebase => {
  if (firebaseCache) {
    return firebaseCache;
  }

  firebase.initializeApp(config);
  firebaseCache = firebase;
  return firebase;
};

export default getFirebase;
