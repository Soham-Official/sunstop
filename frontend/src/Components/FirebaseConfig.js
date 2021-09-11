import { initializeApp } from "firebase/app";
import "firebase/auth";
const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // apiKey: "AIzaSyAxJXF4KMLgtDRKK2AtEsUDh1SBX2BL_7w",
  // authDomain: "sunstop-e258c.firebaseapp.com",
  // projectId: "sunstop-e258c",
  // storageBucket: "sunstop-e258c.appspot.com",
  // messagingSenderId: "404032947077",
  // appId: "1:404032947077:web:d92da60c8b7c4918b7faec",
});
// export const auth = app.auth();
export default app;
