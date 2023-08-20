import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { lastValueFrom, Subject } from 'rxjs';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Injectable()
export class ProductService implements OnDestroy {
  constructor(private auth: AuthService) {}
  destroy$ = new Subject<void>();

  productUrl: string = '';

  ngOnDestroy(): void {}
}
