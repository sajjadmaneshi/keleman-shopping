export interface MegaMenuViewModel {
  id: number;
  parentId: number;
  title: string;
  iconName: string;
  url: string;
  imageAddress: string;
  children: MegaMenuViewModel[];
  seoTitle: string;
  seoDescription: string;
}
