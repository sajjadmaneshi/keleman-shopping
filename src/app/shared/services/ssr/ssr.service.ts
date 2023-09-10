import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class SsrService {
  constructor(@Inject(DOCUMENT) private _doc: Document) {}

  get getDocument(): Document {
    return this._doc;
  }
  get getWindow(): Window | null {
    return this._doc.defaultView;
  }
  get getLocation(): Location {
    return this._doc.location;
  }

  get getWidth(): number {
    return this.getWindow?.innerWidth!;
  }

  get getClientHeight(): number {
    return this._doc.documentElement.clientHeight;
  }
  getElementById(id: string): HTMLElement {
    return this._doc.getElementById(id)!;
  }
}
