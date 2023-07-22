import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-edit-dialog",
  templateUrl: "./edit-dialog.component.html",
  styleUrls: ["./edit-dialog.component.css"],
})
export class EditDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  note_title = this.data.title;
  note_text = this.data.text;
  unchanged = true;

  ngOnInit(): void {}

  onCancelClick() {
    this.dialogRef.close();
  }

  onChangedForm() {
    if (
      this.note_title !== this.data.title ||
      this.note_text !== this.data.text
    ) {
      this.unchanged = false;
    } else {
      this.unchanged = true;
    }
  }

  onSaveClick() {
    return {
      title: this.note_title,
      text: this.note_text,
    };
  }
}
