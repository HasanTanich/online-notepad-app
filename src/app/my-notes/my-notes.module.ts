import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { NoteListComponent } from './note-list/note-list.component';
import { MyNotesRoutingModule } from './my-notes-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MyNotesRoutingModule,
    FlexLayoutModule,
    DragDropModule
  ],
  declarations: [
    NoteListComponent,
  ],
  entryComponents: [
  ]
})
export class MyNotesModule { }
