import { ContentChild, Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appSwiperTemplate]',
  standalone: true,
})
export class SwiperTemplateDirective {}

@Directive({
  selector: 'appSwiperContent',
  standalone: true,
})
export class SwiperContentDirective {
  @ContentChild(SwiperTemplateDirective, { read: TemplateRef })
  template!: TemplateRef<HTMLElement>;
}
