export interface CategoryPropertyOptionViewModel {
  title: string;
  options: [{ title: string }];
}

export class SelectableOption {
  constructor(
    public title: string = '',
    public options: SelectablePropertyModel[] = []
  ) {}
}

export class SelectablePropertyModel {
  constructor(
    public option: string = '',
    public title: string = '',
    public selected: boolean = false
  ) {}
}
