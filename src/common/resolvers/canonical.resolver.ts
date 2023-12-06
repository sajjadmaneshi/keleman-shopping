import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import { environment } from '@ng-bootstrap/ng-bootstrap/environment';
import { ENVIRONMENT } from '../../environments/environment';

@Injectable()
export class CanonicalResolver implements Resolve<boolean> {
  constructor(private meta: Meta, private router: Router) {}

  resolve(): Observable<boolean> {
    const subscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
        this.setCanonicalURL();
        return of(true);
      });

    return of(false);
  }

  private setCanonicalURL(): void {
    const canonicalURL = ENVIRONMENT.baseDomain + this.router.url;
    const head = document.getElementsByTagName('head')[0];

    const existingCanonicalLink = head.querySelector('link[rel="canonical"]');
    if (existingCanonicalLink) {
      head.removeChild(existingCanonicalLink);
    }

    const linkElement = document.createElement('link');
    linkElement.rel = 'canonical';
    linkElement.href = canonicalURL;
    head.appendChild(linkElement);
  }
}
