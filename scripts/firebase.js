// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, setDoc, doc, onSnapshot, where, query, collectionGroup,updateDoc, arrayUnion} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { signOut, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
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
      localStorage.setItem('idUser', user.uid)
      console.log(name)
      localStorage.setItem('nameUser', name)
      setDoc(doc(db, 'users', user.uid), userDoc).then(() => {
        location.href = "home.html";

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
      localStorage.setItem('idUser', user.uid)
      location.href = "home.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });

}

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
  addDoc(collection(userRef, 'proyects'), proyect).then(() => {
    location.href = "proyect.html";
  })

}

export const onGetProyects = (callback) =>

  onSnapshot(collection(doc(db, 'users', localStorage.getItem('idUser')), 'proyects'), callback)


export const onGetMethodologies = (callback) =>

  onSnapshot(collection(db, 'methodologies'), callback)


export const getmethodology = () => getDocs(collection(db, 'methodologies'), localStorage.getItem('idMethodology'))

export const getMethodologyName = (callback) =>

  onSnapshot(query(collection(db, 'methodologies'), where('name', '==', localStorage.getItem('nameMethodology'))), callback)

export const onGetProyect = () => getDocs(collectionGroup(db, 'proyects'), localStorage.getItem('idProyect'))

export const createSesion = (code, idUser, idMethodology, questions) => {
  const userRef = doc(collection(doc(db, 'users', idUser), 'sesion'))
  const id = userRef.id
  const user = []
  var objQuestions = []


  for (let i = 0; i < questions.length; i++) {
    objQuestions.push({ question: questions[i], code: crypto.randomUUID() })
  }
  const sesion = {
    id,
    idUser,
    idMethodology,
    code,
    objQuestions,
    counter: 0,
    users: user,
    start: false,
    completed: false,
  }
  setDoc(userRef, sesion).then(() => {
    localStorage.setItem('idSesion', id)
    location.href = "./interactiveTemplate.html";
  })
}

export const createManualSesion = (idUser, idMethodology,questions) =>{
  const userRef = doc(collection(doc(db, 'users', idUser), 'sesion'))
  const id = userRef.id
  var objQuestions = []
  for (let i = 0; i < questions.length; i++) {
    objQuestions.push({ question: questions[i], code: crypto.randomUUID() })
  }
  const sesion = {
    id,
    idUser,
    idMethodology,
    objQuestions,
    counter: 0,
    start: false,
  }

  setDoc(userRef,sesion).then(()=>{
    localStorage.setItem('idSesion', id)
    location.href = "./manualTemplate.html";

  })
}

export const onGetSesion = (callback) => {
  onSnapshot(doc(db, 'users', localStorage.getItem('idUser'), "sesion", localStorage.getItem('idSesion')), callback)
}

export const setSesion = (counter,start) =>{
  const ref = doc(db, "users", localStorage.getItem('idUser'),"sesion",localStorage.getItem('idSesion'));
  updateDoc(ref,
    {counter: counter,
      start
    })
}

export const addAnswer = (answer) =>{

  const ref = doc(db, "users", localStorage.getItem('idUser'),"sesion",localStorage.getItem('idSesion'));
  setDoc(ref,answer)
}

export const newAnswer = (code, answer) =>{
  const ref = doc(db, "users", localStorage.getItem('idUser'),"sesion",localStorage.getItem('idSesion'));
  updateDoc(ref, {[code]: arrayUnion(answer)}).then(()=>{
  })
}

export const logOut = () =>{
  signOut(auth).then(() => {
    localStorage.clear()
    location.href ="./index.html" 
   }).catch((error) => {
    // An error happened.
  });
}

export const setSesionCompleted = (completed) =>{
  const ref = doc(db, "users", localStorage.getItem('idUser'),"sesion",localStorage.getItem('idSesion'));
  updateDoc(ref,
    {completed: completed,
    })
}

export const addMethodology = (name,objetive,benefit,level,phase,dificulty,caution,time) =>{
  const ref = collection(db, 'methodologies')
  const id = ref.id
  const steps = []
  const questions = []

  const methodology ={
    id,
    name,
    objetive,
    benefit,
    level,
    phase,
    dificulty,
    caution,
    time,
    steps,
    questions

  }

  addDoc(ref,methodology)
}