// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAzLFfc64pA1qpIWs4J5wqdz1V6M8bMiFc',
  authDomain: 'weather-app-13ec9.firebaseapp.com',
  projectId: 'weather-app-13ec9',
  storageBucket: 'weather-app-13ec9.appspot.com',
  messagingSenderId: '906692244226',
  appId: '1:906692244226:web:351dcd0a15d4968fff881b'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)

export default firestore
