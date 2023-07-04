export interface ProductCategoryViewModel {
  id: number;
  parentId?: number;
  titleFa: string;
  titleEn: string;
  iconName: string;
  url: string;
  imageAddress: string;
  children: Array<ProductCategoryViewModel>;
}
