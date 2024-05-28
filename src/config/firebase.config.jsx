import { getApp, getApps, initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDzV9rSASzp1KhQsSS2-YHmxx1wq6YEYK8",
  authDomain: "music-app-a05e6.firebaseapp.com",
  projectId: "music-app-a05e6",
  storageBucket: "music-app-a05e6.appspot.com",
  messagingSenderId: "409516215401",
  appId: "1:409516215401:web:944304b53885a316d1a6f8",
  measurementId: "G-5MRY00S28N"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app); 

export { app, storage, auth };



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCQX23GLPolaMxHR3eUM4zzFeEgm7kUmnA",
//   authDomain: "music-app-999b7.firebaseapp.com",
//   projectId: "music-app-999b7",
//   storageBucket: "music-app-999b7.appspot.com",
//   messagingSenderId: "637377267097",
//   appId: "1:637377267097:web:b902c9b40b82578df47f08",
//   measurementId: "G-92TXQXVJQE"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export{app, analytics}