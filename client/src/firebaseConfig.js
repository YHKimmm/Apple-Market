import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDEaFpLchpuLUe6DQC490uPAgMZHos6tuo",
    authDomain: "apple-market-1b50a.firebaseapp.com",
    projectId: "apple-market-1b50a",
    storageBucket: "apple-market-1b50a.appspot.com",
    messagingSenderId: "364158152656",
    appId: "1:364158152656:web:26e8de3989839156cbd3d5",
    measurementId: "G-TECBP98SW3"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebase;

