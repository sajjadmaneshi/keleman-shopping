import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountRepository } from './account.repository';
import { LoginDto } from './data/login.dto';
import { HttpClientResult } from '../../models/http/http-client.result';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private jwtHelper: JwtHelperService,
    private _authRepository: AccountRepository
  ) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('KELEMAN_TOKEN');
    return !this.jwtHelper.isTokenExpired(token);
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
    localStorage.setItem('MOBILE', data.mobile);
  }
}
