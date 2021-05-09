import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  notes = [
    { title: 'Note', text: "I'm a text" },
    { title: 'Note', text: "I'm a text also also LOL" },
    { title: 'Note', text: "I'm a text also LOL" },
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
