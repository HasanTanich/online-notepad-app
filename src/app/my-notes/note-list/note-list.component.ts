import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/core/services/data.service';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  notes = [
    { title: 'English Vocabulary', text: "I am English" },
    { title: 'Maklooba Recipe', text: "I'm a Recipe" },
    { title: 'Important Information', text: "I'm IMPORTANT!" },
  ];

  colors = [
    { value: 'lightblue', viewValue: 'Light Blue' },
    { value: 'lightgray', viewValue: 'Gray' },
    { value: 'white', viewValue: 'White' },
    { value: 'yellow', viewValue: 'Yellow' },
    { value: 'lightgreen', viewValue: 'Green' },
  ];

  selectedValue: string = "white";
  note;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  }
  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.selectedValue);
  }

  onNoteClick(note: any) {
    this.note = note;
  }

  onEdit(note) {
    this.dialog.open(EditDialogComponent, {
      data: {
        data: note,
      },
      width: '400px',
      height: '400px',
    });
  }

  onDelete(note) {
    this.notes = this.notes.filter(a => {
      return a != note;
    });
  }

}
