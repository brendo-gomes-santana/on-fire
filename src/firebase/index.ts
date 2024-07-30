

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const {
    NEXT_PUBLIC_AUTH_DOMAIN,
    NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_STORAGE_BUCKET,
    NEXT_PUBLIC_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_APP_ID
} = process.env

const firebaseConfig = {
    apiKey: 'AIzaSyAUMLJyI92EEtdUsiGs3ae72jPtCtw5Alc',
    authDomain: NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: NEXT_PUBLIC_PROJECT_ID,
    storageBucket: NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: NEXT_PUBLIC_APP_ID
};

const firebaseApp  = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export {
    db,
    auth
}