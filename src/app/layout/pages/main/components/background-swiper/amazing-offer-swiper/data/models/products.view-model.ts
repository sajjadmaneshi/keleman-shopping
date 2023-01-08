import { ProductViewModel } from './product.view-model';

export interface ProductsViewModel {
  products: ProductViewModel[];

  total: number;
  skip: number;
  limit: number;
}
