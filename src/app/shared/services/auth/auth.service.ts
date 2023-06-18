import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountRepository } from './account.repository';
import { LoginDto } from './data/login.dto';
import { HttpClientResult } from '../../models/http/http-client.result';

import { BehaviorSubject, Observable } from 'rxjs';
import { UserSimpleInfoViewModel } from '../../models/view-models/user-simple-info.view-model';
import { UserRepository } from '../../repositories/user/user.repository';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    private jwtHelper: JwtHelperService,
    private _authRepository: AccountRepository,
    private _userRepository: UserRepository
  ) {}

  public get isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('KELEMAN_TOKEN');
    console.log(this.jwtHelper.isTokenExpired(token));
    this.isLoggedIn.next(!this.jwtHelper.isTokenExpired(token));
    return this.isLoggedIn.asObservable();
  }

  public sendVerificationCode(mobile: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._authRepository.sendVerificationCode(mobile).subscribe(
        () => resolve(),
        () => reject()
      );
    });
  }

  public decodeJson() {
    const accessToken = localStorage.getItem('KELEMAN_TOKEN');
    if (accessToken) {
      console.log(this.jwtHelper.decodeToken(accessToken));
    }
  }

  public login(dto: LoginDto): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._authRepository.login(dto).subscribe(
        (result) => {
          this.setAuthorizedInfoToLocalStorage(result.result);
          resolve();
        },
        () => reject()
      );
    });
  }

  public hasCompleteProfile(mobileNumber: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this._authRepository.hasCompleteProfile(mobileNumber).subscribe(
        (result: HttpClientResult<boolean>) => {
          resolve(result.result as boolean);
        },
        () => reject()
      );
    });
  }

  public setAuthorizedInfoToLocalStorage(data: {
    token: string;
    mobile: string;
  }) {
    localStorage.setItem('KELEMAN_TOKEN', data.token);
    this.getUserSimpleInfo();
    this.isLoggedIn.next(true);
    localStorage.setItem('MOBILE', data.mobile);
  }
  public logout() {
    localStorage.removeItem('KELEMAN_TOKEN');
    localStorage.removeItem('MOBILE');
    this.isLoggedIn.next(false);
  }

  public getUserSimpleInfo(): Promise<UserSimpleInfoViewModel | undefined> {
    return new Promise<UserSimpleInfoViewModel | undefined>(
      (resolve, reject) => {
        if (localStorage.getItem('KELEMAN_TOKEN')) {
          this._userRepository.getSimpleInfo().subscribe(
            (response: HttpClientResult<UserSimpleInfoViewModel>) => {
              resolve(response.result!);
            },
            () => reject()
          );
        } else {
          resolve(undefined);
        }
      }
    );
  }
}
