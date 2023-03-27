// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC0-RJvzGjmK5C3QbIGwuySi1b0sx_Z8sM",
    authDomain: "clubeventmanagement-24bb4.firebaseapp.com",
    projectId: "clubeventmanagement-24bb4",
    storageBucket: "clubeventmanagement-24bb4.appspot.com",
    messagingSenderId: "382453382502",
    appId: "1:382453382502:web:b2a0addf47808c318b1ca7"
  };

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export {storage, ref, uploadBytes, uploadBytesResumable, getDownloadURL, listAll, firebaseApp};