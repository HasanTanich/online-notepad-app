import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CustomMaterialModule } from "../custom-material/custom-material.module";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { ContentPlaceholderAnimationComponent } from "./content-placeholder-animation/content-placeholder-animation.component";
import { LayoutComponent } from "./layout/layout.component";

@NgModule({
  imports: [
    RouterModule,
    CustomMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  declarations: [
    ConfirmDialogComponent,
    ContentPlaceholderAnimationComponent,
    LayoutComponent,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CustomMaterialModule,
    ConfirmDialogComponent,
    ContentPlaceholderAnimationComponent,
  ],
  entryComponents: [ConfirmDialogComponent],
})
export class SharedModule {}
