import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'keleman-product-album',
  templateUrl: './product-album.component.html',
  styleUrls: ['./product-album.component.scss'],
})
export class ProductAlbumComponent {
  isLoading = new BehaviorSubject(false);
  slides: string[] = [
    'assets/media/temp/1.jpg',
    'assets/media/temp/1.jpg',
    'assets/media/temp/1.jpg',
    'assets/media/temp/1.jpg',
    'assets/media/temp/1.jpg',
    'assets/media/temp/1.jpg',
    'assets/media/temp/1.jpg',
    'assets/media/temp/1.jpg',
    'assets/media/temp/1.jpg',
    'assets/media/temp/1.jpg',
  ];
}
