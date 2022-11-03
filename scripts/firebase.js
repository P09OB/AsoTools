// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, setDoc, doc, onSnapshot, where, query, collectionGroup,updateDoc, arrayUnion} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"
import { signOut, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getStorage, ref, uploadBytes,uploadBytesResumable,getDownloadURL } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";


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
const storage = getStorage(app);
let updateOne = false;
let updateTwo = false;

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

      console.log(errorMessage)

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

      console.log(errorCode)


    });

}

export const addProyect = (idUser, proyectName, communityName, creationDate, description, level, progress, state,) => {

  const userRef = doc(collection(doc(db, 'users', idUser), 'proyects'))
  const id = userRef.id

  const proyect = {
    id,
    proyectName,
    communityName,
    creationDate,
    description,
    level,
    progress,
    state,
    progress: 0,
  }
  setDoc(userRef,proyect).then(() => {
    location.href = `./proyect.html?id=${id}&name=${proyectName}`
  })

}

export const onGetProyects = (callback) =>

  onSnapshot(collection(doc(db, 'users', localStorage.getItem('idUser')), 'proyects'), callback)


export const onGetMethodologies = (callback) =>

  onSnapshot(collection(db, 'methodologies'), callback)


export const getmethodology = (callback) => onSnapshot(query(collection(db, 'methodologies'),where('id', '==', localStorage.getItem('idMethodology'))),callback )

export const getMethodologyName = (callback) =>

  onSnapshot(query(collection(db, 'methodologies'), where('name', '==', localStorage.getItem('nameMethodology'))), callback)

export const onGetProyect = (callback) => 

onSnapshot(doc(db, 'users', localStorage.getItem('idUser'), "proyects", localStorage.getItem('idProyect')), callback)

export const createSesion = (code, idUser, idMethodology, questions) => {
  const userRef = doc(collection(doc(db, 'users', idUser), 'sesion'))
  const id = userRef.id
  const user = []
  var objQuestions = []


  for (let i = 0; i < questions.length; i++) {
    objQuestions.push({ question: questions[i], code: 'questions'+[i] })
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

export const createManualSesion = (idUser, idMethodology,questions,template) =>{
  const userRef = doc(collection(doc(db, 'users', idUser), 'sesion'))
  const id = userRef.id
  var objQuestions = []
  for (let i = 0; i < questions.length; i++) {
    objQuestions.push({ question: questions[i], code: 'questions'+[i] })
  }
  const sesion = {
    id,
    idUser,
    idMethodology,
    objQuestions,
    counter: 0,
    start: false,
    template
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

export const addMethodology = (name,objetive,benefit,level,phase,dificulty,caution,time,steps, questions,templatesFiles,profileFiles) =>{
  const refe = doc(collection(db, 'methodologies'))
  const id = refe.id
  const uploadPromises = [];
  const downloadUrlPromises = [];
  const downloadUrlPromisesPP = [];


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

  setDoc(refe,methodology).then(()=>{


    templatesFiles.forEach((file) => {

      const storageRef = ref(storage,`methodologies/${id}`);

      const refStorage =  uploadBytesResumable(ref(storageRef,`templates/${file.name}`), file)
      refStorage.on('state', (snapshot)=>{

        var progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload"+ progess + "%")
      }, 

      (error) =>{
        console.log("Error")
      },

      ()=>{
        getDownloadURL(refStorage.snapshot.ref).then((downloadURL)=>{
          downloadUrlPromises.push({
            url: downloadURL
          })

          updateDoc(refe, {
            templates: downloadUrlPromises

          }).then(()=>{
            updateOne = true;
            if(updateOne & updateTwo){
              location.href =`./methodology.html?id=${id}&name=${name}`
            }
          });
        })
      })
  });

  profileFiles.forEach((file) => {

    const storageRef = ref(storage,`methodologies/${id}`);

    const refStorage =  uploadBytesResumable(ref(storageRef,`profile/${file.name}`), file)
    refStorage.on('state', (snapshot)=>{

      var progess = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload"+ progess + "%")
    }, 

    (error) =>{
      console.log("Error")
    },

    ()=>{
      getDownloadURL(refStorage.snapshot.ref).then((downloadURL)=>{
        downloadUrlPromisesPP.push({
          url: downloadURL
        })

        updateDoc(refe, {
          profilePicture: downloadUrlPromisesPP
        }).then(()=>{
          updateTwo = true;
          if(updateOne & updateTwo){
            location.href =`./methodology.html?id=${id}&name=${name}`
          }
        }

        );
      })
    })
  })
  })
}