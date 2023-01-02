import { Component } from '@angular/core';
import { ProductItemModel } from '../../../../../../../shared/models/product-item.model';

@Component({
  selector: 'keleman-product-album',
  templateUrl: './product-album.component.html',
  styleUrls: ['./product-album.component.scss'],
})
export class ProductAlbumComponent {
  slides: string[] = [
    'assets/media/temp/80e39485-22e5-42e9-ad6c-c11486818a75-thumb.jpg',
    'assets/media/temp/80e39485-22e5-42e9-ad6c-c11486818a75-thumb.jpg',
    'assets/media/temp/80e39485-22e5-42e9-ad6c-c11486818a75-thumb.jpg',
    'assets/media/temp/80e39485-22e5-42e9-ad6c-c11486818a75-thumb.jpg',
    'assets/media/temp/80e39485-22e5-42e9-ad6c-c11486818a75-thumb.jpg',
    'assets/media/temp/80e39485-22e5-42e9-ad6c-c11486818a75-thumb.jpg',
    'assets/media/temp/80e39485-22e5-42e9-ad6c-c11486818a75-thumb.jpg',
    'assets/media/temp/80e39485-22e5-42e9-ad6c-c11486818a75-thumb.jpg',
    'assets/media/temp/80e39485-22e5-42e9-ad6c-c11486818a75-thumb.jpg',
    'assets/media/temp/80e39485-22e5-42e9-ad6c-c11486818a75-thumb.jpg',
  ];
}
