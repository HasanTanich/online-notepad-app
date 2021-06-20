import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private angularFireStore: AngularFirestore, private authService: AuthenticationService) { 
  }
  allNotes;

  getNote() {
    let currentUser = this.authService.getCurrentUser();
    let notesList = this.angularFireStore.collection('users').doc(currentUser.uid);
    return notesList.get();
  }

  addNote(note) {
    let currentUser = this.authService.getCurrentUser();
    // get all notes from database and add the new note, then return the new list with the new note
    let notesList = this.getNote();
    notesList.subscribe(a=>{
      this.allNotes = a.data();
      this.allNotes = this.allNotes.notes;
      this.allNotes.push(note);
      return this.angularFireStore.collection('users').doc(currentUser.uid).set({
        notes: this.allNotes
      });
    });
    };

  updateNote(note) {
    let currentUser = this.authService.getCurrentUser();

    let notesList = this.getNote();
    notesList.subscribe(a=>{
      this.allNotes = a.data();
      this.allNotes = this.allNotes.notes;
      this.allNotes = this.allNotes.map(a=>{
        if(a.id == note.id){
          a.title = note.title;
          a.text = note.text;
        }
        return a;
      });
      return this.angularFireStore.collection('users').doc(currentUser.uid).set({
        notes: this.allNotes
      });
    });
    };

    deleteNote(note) {
      let currentUser = this.authService.getCurrentUser();
      let notesList = this.getNote();
      notesList.subscribe(a=>{
        this.allNotes = a.data();
        this.allNotes = this.allNotes.notes;
        this.allNotes = this.allNotes.filter(a => {
          return a.id != note.id;
        });
        return this.angularFireStore.collection('users').doc(currentUser.uid).set({
          notes: this.allNotes
        });
      });
      };
  }
