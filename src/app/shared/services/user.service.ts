import { UserSimpleInfoViewModel } from '../models/view-models/user-simple-info.view-model';
import { UserRepository } from '../repositories/user/user.repository';
import { HttpClientResult } from '../models/http/http-client.result';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  isLoading = false;
  userSimpleInfo!: UserSimpleInfoViewModel;

  constructor(private _userRepository: UserRepository) {}

  getUserSimpleInfo(): void {
    this.isLoading = true;

    if (localStorage.getItem('KELEMAN_TOKEN')) {
      this._userRepository
        .getSimpleInfo()
        .pipe(tap(() => (this.isLoading = false)))
        .subscribe((response: HttpClientResult<UserSimpleInfoViewModel>) => {
          this.userSimpleInfo = response.result!;
        });
    }
  }
}
