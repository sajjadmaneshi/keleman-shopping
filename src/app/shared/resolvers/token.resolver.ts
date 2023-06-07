import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class TokenResolver implements Resolve<boolean> {
  constructor(private router: Router) {}

  resolve(): Observable<boolean> {
    const token = localStorage.getItem('KELEMAN_TOKEN');

    if (token) {
      this.router.navigate(['/']);
      return of(false);
    }

    return of(true);
  }
}
