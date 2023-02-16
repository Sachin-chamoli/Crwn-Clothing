import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  doc,                  //to get documnet
  getDoc,                 //to get data from document
  setDoc,                //to set data into the documet
  collection,           
  writeBatch,  
  query,
  getDocs
} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc4eiqBgmEfr6tCn1-kr69U2DVr2r1xNI",
  authDomain: "crwn-clothing-db-56332.firebaseapp.com",
  projectId: "crwn-clothing-db-56332",
  storageBucket: "crwn-clothing-db-56332.appspot.com",
  messagingSenderId: "994646357340",
  appId: "1:994646357340:web:3078253eee6037dcea3d99"
};

// Initialize Firebase
const firbaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// export const createUserProfileDocument = async (userAuth, additionalData) => {
//   if (!userAuth) return;

//   console.log(userAuth);
// };

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// export const singInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

//method to upload categories from shop data to firestore database
export const addCollectionAndDocuments  = async (collectionKey, objectsToAdd) =>{
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  batch.commit();
  console.log('done')
}

export const getCategoriesAndDocuments = async () =>{
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
  
  // const categoryMap = querySnapshot.docs.reduce((acc, docsSnapshot) => {
  //   const {title, items} = docsSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});

  // return categoryMap;
}

export const  createUserDocumentFromAuth = async (userAuth, additionalInformation={}) =>{
  if(!userAuth) return;
  const userDocRef = doc(db, "users" , userAuth.uid);

  // console.log(userDocRef);

  const userSnapshot =  await getDoc(userDocRef);
  console.log(userSnapshot); 
  console.log(userSnapshot.exists());     //it tell user data exists or not

  if(!userSnapshot.exists()){
    const {displayName , email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef , {
        displayName,
        email , 
        createdAt,
        ...additionalInformation
      })
    } catch(error){
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef;
  //if user data doesn't exists
  //create / set document with the data from userAuth in my colletion

  //if user data exists 
  //return the data

}

export const createAuthUserWithEmailAndPassword = async(email, password) =>{

  if(!email || !password) return ;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async(email, password) =>{

  if(!email || !password) return ;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback);