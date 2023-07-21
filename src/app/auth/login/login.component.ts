import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/core/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [AuthenticationService, Title],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loading: boolean;

  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.titleService.setTitle("online-notepad-app - Login");
    this.authenticationService.logout();
    this.createForm();
  }

  private createForm() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      rememberMe: new FormControl(false),
    });

    this.registerForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    });
  }

  signUp() {
    const email = this.registerForm.get("email");
    const password = this.registerForm.get("password");
    this.authenticationService.signup(email.value, password.value);
    this.registerForm.reset();
  }

  signIn() {
    const email = this.loginForm.get("email");
    const password = this.loginForm.get("password");
    this.authenticationService.login(email.value, password.value);
    this.loginForm.reset();
  }

  resetPassword() {
    this.router.navigate(["/auth/password-reset-request"]);
  }
}
