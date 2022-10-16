// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs,getDoc, setDoc, doc, onSnapshot,where,query,collectionGroup } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
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
const auth = getAuth();
let idMethodology = ""
let loggedUser = null

export const createUser = (name, email, password) =>
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      loggedUser = user.uid
      const userDoc = {
        name,
        email,
        id: user.uid
      }
      localStorage.setItem('idUser',user.uid)
      localStorage.setItem('name',name)
      setDoc(doc(db, 'users', user.uid), userDoc).then(()=>{
        location.href="home.html";

      })

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

export const checkUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Inicie Sesión")
      const user = userCredential.user;
      loggedUser = user.uid
      localStorage.setItem('idUser',user.uid)
      location.href="home.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });

}

export const getUser = () => getDoc(db, 'user', localStorage.getItem('idUser'))

export const addProyect = (id, proyectName, communityName, creationDate, description, level, progress, state) => {

  console.log(loggedUser)

  const proyect = {
    proyectName,
    communityName,
    creationDate,
    description,
    level,
    progress,
    state
  }
  const userRef = doc(db, 'users', id);
  addDoc(collection(userRef, 'proyects'), proyect).then(()=>{
    location.href="proyect.html";
  })

}

export const onGetProyects = (callback) => 

onSnapshot(collection(doc(db, 'users', localStorage.getItem('idUser')), 'proyects'),callback)


export const onGetMethodologies = (callback) =>

onSnapshot(collection(db, 'methodologies'),callback)


export const getmethodology =() => getDocs( collection(db, 'methodologies'), localStorage.getItem('idMethodology'))

export const getMethodologyName = (callback) =>

 onSnapshot( query( collection(db, 'methodologies'), where('name', '==', localStorage.getItem('nameMethodology'))),callback)

export const onGetProyect = () => getDocs( collection(db, 'proyects'), localStorage.getItem('idProyect'))

export const createSesion = (code, idUser, idMethodology) =>{
  const userRef = doc(collection(doc(db, 'users', idUser), 'sesion'))
  const id = userRef.id
  const user = []
  const sesion = {
    id,
    idUser,
    idMethodology,
    code,
    users: user,
  }
  setDoc(userRef, sesion).then(()=>{
    localStorage.setItem('idSesion',id)
   location.href="./interactiveTemplate.html";
  })

}

export const onGetSesion = (callback) =>{
  onSnapshot(doc(db, 'users', localStorage.getItem('idUser'),"sesion",localStorage.getItem('idSesion')),callback)
}
