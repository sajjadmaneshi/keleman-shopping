export interface SearchViewModel {
  products: Array<SearchItemViewModel>;
  articles: Array<SearchItemViewModel>;
}

export interface SearchItemViewModel {
  id: number;
  title: string;
  url: string;
}
