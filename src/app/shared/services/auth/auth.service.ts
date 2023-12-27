import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountRepository } from './account.repository';
import { LoginDto } from './data/login.dto';
import { HttpClientResult } from '../../data/models/http/http-client.result';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserSimpleInfoViewModel } from '../../data/models/view-models/user-simple-info.view-model';
import { UserRepository } from '../../data/repositories/user/user.repository';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  constructor(
    private jwtHelper: JwtHelperService,
    private _authRepository: AccountRepository,
    private _userRepository: UserRepository,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  private _isTokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  public get isAuthenticated(): Observable<boolean> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('KELEMAN_TOKEN');
      if (token) {
        this.isLoggedIn$.next(!this._isTokenExpired(token!));
        if (this._isTokenExpired(token!)) this.logout();
      }
    }
    return this.isLoggedIn$.asObservable();
  }

  public sendVerificationCode(
    mobile: string
  ): Promise<HttpClientResult<void> | undefined> {
    return this._authRepository.sendVerificationCode(mobile).toPromise();
  }

  public decodeJson() {
    const accessToken = localStorage.getItem('KELEMAN_TOKEN');
    if (accessToken) {
    }
  }

  public async login(dto: LoginDto): Promise<void> {
    try {
      const result = await this._authRepository.login(dto).toPromise();
      this.setAuthorizedInfoToLocalStorage(result?.result);
    } catch (error) {
      throw error;
    }
  }

  public async hasCompleteProfile(mobileNumber: string): Promise<boolean> {
    try {
      const result = await this._authRepository
        .hasCompleteProfile(mobileNumber)
        .toPromise();
      return result?.result as boolean;
    } catch (error) {
      throw error;
    }
  }

  public setAuthorizedInfoToLocalStorage(data: {
    token: string;
    mobile: string;
  }) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('KELEMAN_TOKEN', data.token);
      const decodeToken = this.jwtHelper.decodeToken(data.token);
      localStorage.setItem('USERID', decodeToken.sub);
      this.isLoggedIn$.next(true);
    }
  }
  public logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('KELEMAN_TOKEN');
      localStorage.removeItem('MOBILE');
      localStorage.removeItem('USERID');
      this.isLoggedIn$.next(false);
    }
  }

  public async getUserSimpleInfo(): Promise<
    UserSimpleInfoViewModel | undefined
  > {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('KELEMAN_TOKEN')) {
        try {
          const response = await this._userRepository
            .getSimpleInfo()
            .toPromise();
          return response?.result as UserSimpleInfoViewModel;
        } catch (error) {
          throw error;
        }
      } else return undefined;
    }
    return undefined;
  }
}
