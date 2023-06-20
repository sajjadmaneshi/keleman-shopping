import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../../shared/services/auth/auth.service';
import { InitialAppService } from '../../../../../shared/services/initial-app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'keleman-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  subscription!: Subscription;

  constructor(
    private _authService: AuthService,
    public userService: InitialAppService
  ) {}

  ngOnInit(): void {
    this.subscription = this._authService.isAuthenticated.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
