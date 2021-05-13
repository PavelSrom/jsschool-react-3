import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDXForeQg2P_DsHGNW3Z6LN1tDGskjAOPQ',
  authDomain: 'react-mui-firebase.firebaseapp.com',
  projectId: 'react-mui-firebase',
  storageBucket: 'react-mui-firebase.appspot.com',
  messagingSenderId: '182271660430',
  appId: '1:182271660430:web:ede7f30b1a63e466c914df',
  measurementId: 'G-LSNZ6KEB0Z',
} as const

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const timestamp = firebase.firestore.FieldValue.serverTimestamp
