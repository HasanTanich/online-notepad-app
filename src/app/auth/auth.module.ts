import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { PasswordResetRequestComponent } from "./password-reset-request/password-reset-request.component";
import { PasswordResetComponent } from "./password-reset/password-reset.component";

@NgModule({
  imports: [CommonModule, SharedModule, AuthRoutingModule],
  declarations: [
    LoginComponent,
    PasswordResetRequestComponent,
    PasswordResetComponent,
  ],
})
export class AuthModule {}
