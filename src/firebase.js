import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBb37TK7hM_s_-aQGehqN7gupj0UFRJd1s',
  authDomain: 'whatsapp-mern-cc2bb.firebaseapp.com',
  databaseURL: 'https://whatsapp-mern-cc2bb.firebaseio.com',
  projectId: 'whatsapp-mern-cc2bb',
  storageBucket: 'whatsapp-mern-cc2bb.appspot.com',
  messagingSenderId: '289629947304',
  appId: '1:289629947304:web:5631c5c84242c7d649499d',
};

const firebaseapp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
