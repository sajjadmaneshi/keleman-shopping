import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { ProductRepository } from '../../../data/repositories/product.repository';
import { ProductGalleryViewModel } from '../../../data/models/view-models/product-gallery.view-model';
import { ENVIRONMENT } from '../../../../../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'keleman-product-album',
  templateUrl: './product-album.component.html',
})
export class ProductAlbumComponent {
  downloadUrl = ENVIRONMENT.downloadUrl;
  @Input() isLoading = new BehaviorSubject(true);

  subscription!: Subscription;

  @Input() gallery: ProductGalleryViewModel[] = [];

  @Output() imageClick = new EventEmitter<ProductGalleryViewModel>();

  onImageClick(image: ProductGalleryViewModel) {
    this.imageClick.emit(image);
  }
}
