import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LazyLoadingDirective } from '../../../shared/directives/lazy-loading.directive';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, LazyLoadingDirective],
})
export class NotFoundComponent {}
