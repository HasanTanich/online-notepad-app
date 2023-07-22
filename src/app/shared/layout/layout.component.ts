import { MediaMatcher } from "@angular/cdk/layout";
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { Subscription } from "rxjs/dist/types/internal/Subscription";
import { timer } from "rxjs";
import { take } from "rxjs/operators";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { SpinnerService } from "../../core/services/spinner.service";
import { AuthenticationService } from "./../../core/services/auth.service";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"],
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  userName: string;
  isAdmin: boolean;

  private autoLogoutSubscription: Subscription;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public spinnerService: SpinnerService,
    private authService: AuthenticationService,
    private authGuard: AuthGuard
  ) {
    this.mobileQuery = this.media.matchMedia("(max-width: 1000px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();

    this.isAdmin = user.isAdmin;
    this.userName = user.fullName;

    // Auto log-out subscription
    const timer$ = timer(2000, 10000).pipe(take(5)); // Emit 5 values at 10000ms intervals starting after 2000ms (2 seconds)

    this.autoLogoutSubscription = timer$.subscribe(() => {
      this.authGuard.canActivate();
    });
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.autoLogoutSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}
