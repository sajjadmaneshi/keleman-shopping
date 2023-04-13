import { ProductViewModel } from '../../../../../../products/data/models/view-models/product.view-model';

export interface ProductsViewModel {
  products: ProductViewModel[];

  total: number;
  skip: number;
  limit: number;
}
