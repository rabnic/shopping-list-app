// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe04oXZGtQeAjgWA-805x99JFeP0t1K90",
  authDomain: "shopping-list-nicho.firebaseapp.com",
  projectId: "shopping-list-nicho",
  storageBucket: "shopping-list-nicho.appspot.com",
  messagingSenderId: "296036002287",
  appId: "1:296036002287:web:5c220848685be61464ee1a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

