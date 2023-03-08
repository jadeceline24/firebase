// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBL8WXX_z3ri4ZfxX3Npt2QUmisoJffCls',
  authDomain: 'fir-course-1c127.firebaseapp.com',
  projectId: 'fir-course-1c127',
  storageBucket: 'fir-course-1c127.appspot.com',
  messagingSenderId: '99272768449',
  appId: '1:99272768449:web:647a6e59ed86494e2a8d40',
  measurementId: 'G-RZF46SJFHH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
