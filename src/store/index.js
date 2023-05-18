import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {  
  getDocs, collection, doc, setDoc, 
  getDoc, 
  getFirestore, deleteDoc} from "firebase/firestore";
import {  
  getAuth, 
  //signOut, 
  signInWithEmailAndPassword
} from "firebase/auth";
// Your web app's Firebase configuration
const app = initializeApp({
  apiKey: "AIzaSyDEnAdzKeJezq6X1l4jqrzANqkVLFBvlNc",
  authDomain: "note-manager-38b89.firebaseapp.com",
  projectId: "note-manager-38b89",
  storageBucket: "note-manager-38b89.appspot.com",
  messagingSenderId: "313724515683",
  appId: "1:313724515683:web:b8ed64102f44d9e5e08f56"
});

// Initialize Firebase
const DB = getFirestore(app);
const AUTH = getAuth(app);

function getDocFromDB (deskID, colID) {
  return getDoc(doc(DB, deskID, colID));
}

function getNotesFromDB (colID) {
  return getDocs(collection(DB, colID))
}


export default new Vuex.Store({
  state: {
    categories: {
      1: 'home',
      2: 'work',
      3: 'education',
      4: 'hobby',
      5: 'frends'
    },
    notesDB: [],
    notesFromSearch: [],
    EditNote: [],
    isLoggedIn: false,
    UID: ''
  },
  getters: {
    getCategories (state) {
      return state.categories;
    },
    getEditNote (state) {
      return state.EditNote;
    },
    getNotesFromDB (state) {
      return state.notesDB;
    },
    getNotesFromSearch (state) {
      return state.notesFromSearch;
    },
    getIsLoggedIn (state) {
      return state.isLoggedIn;
    }
  },
  mutations: {
    filteredNotes (state, filtNote) {
      state.notesDB = filtNote;
    }
  },
  actions: {
   fetchNote(context) {
    getNotesFromDB(this.state.UID)
      .then(data => {
        context.state.notesDB = [];
        data.forEach(list => {
          context.state.notesDB.push(list.data());
      });
    })
  },
  addNoteToDB (context, note) {
    return setDoc(doc(DB, context.state.UID, note.id), note);
  },
  deleteNoteInDB (context, ID) {  
    return deleteDoc(doc(DB, context.state.UID, ID))
  },
  fetchNoteFromID (context, ID) {
    return getDocFromDB (context.state.UID, ID)
    .then(data => {
      console.log(data.data());
      context.state.EditNote = [];
      context.state.EditNote = data.data();
      })
    },
    fetchNoteFromSearch(context) {
      getNotesFromDB(context.state.UID)
        .then(data => {
          context.state.notesFromSearch = [];
          data.forEach(list => {
            context.state.notesFromSearch.push(list.data());
        });
      })
    },
    login(context, userCred) {
      signInWithEmailAndPassword(AUTH, userCred.email, userCred.pass)
      .then ((Credential)=>{
        context.state.isLoggedIn = true;
        context.state.UID = Credential.user.uid;
        localStorage.setItem('userCred', JSON.stringify(userCred))
        context.dispatch('fetchNote')
        context.dispatch('fetchNoteFromSearch')
      })
      .catch((error)=>{
        console.error(error)
      })
    }
  },
  modules: {
  }
})
