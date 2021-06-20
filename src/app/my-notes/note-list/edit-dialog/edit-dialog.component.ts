import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  note_title = this.data.title;
  note_text = this.data.text;

  ngOnInit(): void {
  }

  onCancelClick(){
    this.dialogRef.close();
  }

  onSaveClick(){
    let returndedData = {};
    return returndedData = {
      title: this.note_title,
      text: this.note_text,
    };
  }
}
