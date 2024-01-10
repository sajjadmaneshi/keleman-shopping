import { SellerViewModel } from '../../../product-details/components/stores/seller.view-model';

export interface ProductDetailViewModel {
  id: number;
  name: string;
  description: string;
  thumbnailImage: string;
  rate: number;
  hasGaranty: boolean;
  currentPrice: number;
  seller: {
    id: number;
    name: string;
    url: string;
  };
  produceCountry: {
    id: number;
    persianName: string;
    englishName: string;
  };
  seoTitle: string;
  priceAfterDiscount: number;
  seoDescription: string;
  deliveryDescription: 'string';
  imageAlt: 'string';
  image: 'string';
  brand: 'string';
  haveSelectableProperty: true;
  currentStock: number;
  currentDiscountPercent: number;
  isPackage: boolean;
  stores: SellerViewModel[];
}
