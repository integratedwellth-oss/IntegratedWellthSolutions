/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'firebase/app' {
  export const initializeApp: any;
  export type FirebaseApp = any;
}

declare module 'firebase/auth' {
  export const getAuth: any;
  export const onAuthStateChanged: any;
  export const GoogleAuthProvider: any;
  export const signInWithPopup: any;
  export const signInWithEmailAndPassword: any;
  export const createUserWithEmailAndPassword: any;
  export const signOut: any;
  export type User = any;
  export type Auth = any;
}

declare module 'firebase/firestore' {
  export const getFirestore: any;
  export const collection: any;
  export const doc: any;
  export const getDoc: any;
  export const getDocs: any;
  export const setDoc: any;
  export const addDoc: any;
  export const updateDoc: any;
  export const deleteDoc: any;
  export const query: any;
  export const where: any;
  export const orderBy: any;
  export const limit: any;
  export const onSnapshot: any;
  export const serverTimestamp: any;
  export type Firestore = any;
  export type DocumentData = any;
  export type QuerySnapshot = any;
}

declare module 'firebase/storage' {
  export const getStorage: any;
  export const ref: any;
  export const uploadBytes: any;
  export const getDownloadURL: any;
  export type FirebaseStorage = any;
}

declare module 'firebase/functions' {
  export const getFunctions: any;
  export const httpsCallable: any;
  export type Functions = any;
}



