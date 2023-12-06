import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable()
export class ModifyMetaDataService {
  title = 'بازرگانی آسانسور کلمان';
  constructor(private readonly _title: Title, private readonly _meta: Meta) {}

  public setMetaData(title: string = this.title, description?: string) {
    this._title.setTitle(title);
    this._meta.addTag({ name: 'keywords', content: title });

    if (description)
      this._meta.addTag({ name: 'description', content: description });
  }
}
