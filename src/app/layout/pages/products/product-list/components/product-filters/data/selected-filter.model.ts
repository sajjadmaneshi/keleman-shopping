export class SelectedFilterModel {
  categories!: [
    {
      id: number;
      title: string;
    }
  ];
  brands!: [
    {
      id: number;
      title: string;
    }
  ];
  sellers!: [
    {
      id: number;
      title: string;
    }
  ];
  price!:
    | {
        min: number;
        max: number;
      }
    | undefined;
  outOfStock: boolean = false;
}
