import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCv5HNqY91PH5aP-G2ID935f8HHq7Xy_vo",
  authDomain: "snappy-social-onboarding.firebaseapp.com",
  projectId: "snappy-social-onboarding",
  storageBucket: "snappy-social-onboarding.firebasestorage.app",
  messagingSenderId: "728708709120",
  appId: "1:728708709120:web:dcd27da063f8bfd05151e5",
  measurementId: "G-W5YLGEG149"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
