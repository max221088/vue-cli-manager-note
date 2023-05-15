import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {  getDocs, collection, doc, setDoc, getDoc, getFirestore, deleteDoc} from "firebase/firestore";
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
    //notes: [],
    notesDB: [],
    EditNote: []
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
  },
  mutations: {
  },
  actions: {
   fetchNote(context) {
    getNotesFromDB('work-desk')
      .then(data => {
        context.state.notesDB = [];
        data.forEach(list => {
          //console.log(list)
          context.state.notesDB.push(list.data());
      });
      //console.log(context.state.notesDB);
    })
  },
  addNoteToDB (context, note) {
    return setDoc(doc(DB, 'work-desk', note.id), note);
  },
  deleteNoteInDB (context, ID) {   // <-- новый метод
    return deleteDoc(doc(DB, "work-desk", ID))
  },
  fetchNoteById (context, ID) {
    return getDocFromDB ('work-desk', ID)
    .then(data => {
      context.state.EditNote = data.data();
      console.log(context.state.EditNote)
      
      })
    }
  },
  modules: {
  }
})
