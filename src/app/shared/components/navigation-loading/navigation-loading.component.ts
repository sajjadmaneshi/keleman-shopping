import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NavigationLoadingService } from '../../services/navigation-loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'keleman-navigation-loading',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './navigation-loading.component.html',
  styleUrl: './navigation-loading.component.scss',
})
export class NavigationLoadingComponent {
  loading$ = new Observable<boolean>();

  constructor(loadingService: NavigationLoadingService) {
    this.loading$ = loadingService.loading$;
  }
}
