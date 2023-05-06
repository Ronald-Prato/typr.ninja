// Import the functions you need from the SDKs you need
// import { getAnalytics } from 'firebase/analytics'
import { getApp, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

function createFirebaseApp(config: typeof firebaseConfig) {
  try {
    return getApp()
  } catch {
    return initializeApp(config)
  }
}

// Initialize Firebase
export const firebaseApp = createFirebaseApp(firebaseConfig)
// let analytics

// if (firebaseApp.name && typeof window !== 'undefined') {
//   analytics = getAnalytics(firebaseApp)
// }

// export analytics
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
