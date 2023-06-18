export interface ProductCategoryViewModel {
  id: number;
  parentId?:number;
  titleFa: string;
  titleEn:string;
  iconName:string;
  url:string;
  children:Array<ProductCategoryViewModel>;
}
