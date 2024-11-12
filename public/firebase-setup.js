import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBJNvkc3g4w0oSYbgpWRsSxtLDSRZvFFSo",
    authDomain: "lotto-6e388.firebaseapp.com",
    projectId: "lotto-6e388",
    storageBucket: "lotto-6e388.appspot.com",
    messagingSenderId: "1049963461205",
    appId: "1:1049963461205:web:c150f04915c31ed3dd32dc"
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
