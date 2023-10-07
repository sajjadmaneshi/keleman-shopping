export interface CategoryPropertyOptionViewModel {
  title: string;
  seoTitle: string;
  options: PropertyViewModel[];
}
export interface PropertyViewModel {
  title: string;
}

export interface OptionViewModel extends PropertyViewModel {
  seoTitle: string;
}

export class SelectableOption {
  constructor(
    public title = '',
    public seoTitle: string,
    public options: SelectablePropertyModel[] = []
  ) {}
}

export class SelectablePropertyModel {
  constructor(
    public option: OptionViewModel,
    public title: string = '',
    public selected: boolean = false
  ) {}
}
