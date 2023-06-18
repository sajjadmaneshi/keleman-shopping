import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../shared/services/auth/auth.service';
import {InitialAppService} from "../../../../../shared/services/initial-app.service";

@Component({
  selector: 'keleman-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    private _authService: AuthService,
    public userService: InitialAppService
  ) {}

  ngOnInit(): void {
    this._authService.isAuthenticated.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }
}
