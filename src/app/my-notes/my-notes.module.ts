import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { SharedModule } from "../shared/shared.module";
import { MyNotesRoutingModule } from "./my-notes-routing.module";
import { AddDialogComponent } from "./note-list/add-dialog/add-dialog.component";
import { EditDialogComponent } from "./note-list/edit-dialog/edit-dialog.component";
import { NoteListComponent } from "./note-list/note-list.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MyNotesRoutingModule,
    FlexLayoutModule,
    DragDropModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
  ],
  declarations: [NoteListComponent, EditDialogComponent, AddDialogComponent],
  entryComponents: [],
})
export class MyNotesModule {}
