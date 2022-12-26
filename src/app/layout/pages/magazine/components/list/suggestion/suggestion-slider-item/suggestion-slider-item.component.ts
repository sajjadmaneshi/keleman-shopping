import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-suggestion-slider-item',
  standalone:true,
  template: `
    <div class="card h-100">
      <img class="suggestion-item-image" [src]="source" alt="suggestion-image">
    </div>`,
  styles: [`.suggestion-item-image {
    border-radius: inherit;
    height: 100%;
    object-fit: cover;
  }`]
})
export class SuggestionSliderItemComponent {

  @Input('src') source!: string;



}
