import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NoteListComponent } from './note-list/note-list.component';
import { MyNotesRoutingModule } from './my-notes-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { EditDialogComponent } from './note-list/edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './note-list/add-dialog/add-dialog.component';
import { FormsModule } from '@angular/forms';


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
  declarations: [
    NoteListComponent,
    EditDialogComponent,
    AddDialogComponent,
  ],
  entryComponents: [
  ]
})
export class MyNotesModule { }
