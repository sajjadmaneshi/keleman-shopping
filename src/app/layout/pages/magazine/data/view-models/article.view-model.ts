import { ArticleSimpleDataViewModel } from './article-simple-data.view-model';

export interface ArticleViewModel extends ArticleSimpleDataViewModel {
  customUrl: string;

  category: {
    id: number;
    name: string;
    url: string;
    seoTitle: string;
    seoDescription: string;
  };
  body: string;
  seoTitle: string;
  secKeyword: string;
  secoDescription: string;
}
