import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductGalleryViewModel } from '../../../data/models/view-models/product-gallery.view-model';

@Component({
  selector: 'keleman-product-album',
  templateUrl: './product-album.component.html',
})
export class ProductAlbumComponent {
  @Input() isLoading = new Observable<boolean>();

  @Input() gallery: ProductGalleryViewModel[] = [];

  @Output() imageClick = new EventEmitter<ProductGalleryViewModel>();

  onImageClick(image: ProductGalleryViewModel) {
    this.imageClick.emit(image);
  }
}
