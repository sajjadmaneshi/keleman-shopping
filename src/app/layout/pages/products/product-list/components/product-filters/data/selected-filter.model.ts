import { SelectablePropertyModel } from '../../../../data/models/view-models/category-property-option.view-model';

export class SelectedFilterModel {
  constructor(public filters: SelectablePropertyModel[] = []) {}

  price!:
    | {
        min: number;
        max: number;
      }
    | undefined;
  outOfStock: boolean = false;
}
