// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeLQngkXWfIQHP43HCnPng0oGmpmw-CtM",
  authDomain: "wepromolink.firebaseapp.com",
  projectId: "wepromolink",
  storageBucket: "wepromolink.appspot.com",
  messagingSenderId: "439634530246",
  appId: "1:439634530246:web:d2ae1a974cf8b6ac9aacc7",
  measurementId: "G-C379ZGC9TL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = () => signInWithPopup(auth, provider)
export const fbLogOut = () => signOut(auth);

export default app;