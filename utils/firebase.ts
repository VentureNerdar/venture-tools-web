// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getMessaging } from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const config = useRuntimeConfig()

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: config.public.firebase.apiKey,
  authDomain: config.public.firebase.authDomain,
  projectId: config.public.firebase.projectId,
  storageBucket: config.public.firebase.storageBucket,
  messagingSenderId: config.public.firebase.messagingSenderId,
  appId: config.public.firebase.appId,
  measurementId: config.public.firebase.measurementId
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// if (process.client) {
//   getAnalytics(app)
// }
// const analytics = getAnalytics(app)
// const messaging = getMessaging(app)

export { app }
// export { messaging }