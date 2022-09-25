    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
    import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCPllQ51fvUDszKOo4ulYc1iolQq7cSHNA",
      authDomain: "asotools-fd4f3.firebaseapp.com",
      projectId: "asotools-fd4f3",
      storageBucket: "asotools-fd4f3.appspot.com",
      messagingSenderId: "954054283858",
      appId: "1:954054283858:web:e365ffef4cab2e94dbc58b"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore()

    export const saveUser = ( email) =>
      addDoc(collection(db, 'users'), {email})
    