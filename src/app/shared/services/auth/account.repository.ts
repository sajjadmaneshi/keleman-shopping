import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientResult } from '../../data/models/http/http-client.result';
import { LoginDto } from './data/login.dto';
import { CompleteInfoDto } from './data/complete-info.dto';

@Injectable({ providedIn: 'root' })
export class AccountRepository extends DataService<any> {
  constructor(_http: HttpClient) {
    super('account', _http);
  }

  sendVerificationCode(mobile: string): Observable<HttpClientResult<void>> {
    const dto = {
      mobile,
    };
    return this._http.post(`${this._getUrl}/otp`, dto) as Observable<
      HttpClientResult<any>
    >;
  }

  login(dto: LoginDto): Observable<HttpClientResult<any>> {
    return this._http.post(`${this._getUrl}/login`, dto) as Observable<
      HttpClientResult<any>
    >;
  }

  hasCompleteProfile(
    mobileNumber: string
  ): Observable<HttpClientResult<boolean>> {
    return this._http.get(
      `${this._getUrl}/hasCompleteProfile/${mobileNumber}`
    ) as Observable<HttpClientResult<boolean>>;
  }

  completeInfo(dto: CompleteInfoDto): Observable<HttpClientResult<any>> {
    return this._http.post(
      `${this._getUrl}/completeInfo`,
      dto
    ) as Observable<any>;
  }
}
