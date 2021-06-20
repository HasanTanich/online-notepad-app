import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

    
  note_title = "";
  note_text = "";

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
