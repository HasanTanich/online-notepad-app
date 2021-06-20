import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/core/services/data.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  // notes = [
  //   { title: 'English Vocabulary', text: "I am English" },
  //   { title: 'Maklooba Recipe', text: "I'm a Recipe" },
  //   { title: 'Important Information', text: "I'm IMPORTANT!" },
  // ];

  colors = [
    { value: 'lightblue', viewValue: 'Light Blue' },
    { value: 'lightgray', viewValue: 'Gray' },
    { value: 'white', viewValue: 'White' },
    { value: 'yellow', viewValue: 'Yellow' },
    { value: 'lightgreen', viewValue: 'Green' },
  ];

  selectedValue: string = "white";
  tempNote;
  noteList;

  constructor(private dataService: DataService, public dialog: MatDialog) { 
  
  }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(){
    return this.dataService.getNote().subscribe(data =>{
      this.noteList = data.data();
      this.noteList = this.noteList.notes;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.noteList, event.previousIndex, event.currentIndex);
  }

  onNoteClick(note: any) {
    this.tempNote = note;
  }

  onEdit(note) {
    let dialogRef = this.dialog.open(EditDialogComponent, {
      data: note,
      width: '400px',
      height: '400px',
      panelClass: 'my-custom-dialog-class'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        note.title = result.title;
        note.text = result.text;
        result = {
          id: note.id,
          title: note.title,
          text: note.text,
        }
        this.dataService.updateNote(result);
      }
    });
  }

  onAdd() {
    let dialogRef = this.dialog.open(AddDialogComponent, {
      width: '400px',
      height: '400px',
      panelClass: 'my-custom-dialog-class'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let randomid = '_' + Math.random().toString(36).substr(2, 9);
        console.log(randomid);
        result = {
          id: randomid,
          title: result.title,
          text: result.text,
        }
        this.noteList.push(result);
        this.dataService.addNote(result);
      }
    });
  }

  onDelete(note) {
    this.noteList = this.noteList.filter(a => {
      return a != note;
    });
    this.tempNote = this.noteList[0];
    this.dataService.deleteNote(note);
  }

}
