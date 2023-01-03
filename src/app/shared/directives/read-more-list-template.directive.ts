import { ContentChild, Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appReadMoreTemplate]',
  standalone: true,
})
export class ReadMoreTemplateDirective {}

@Directive({
  selector: 'appReadMoreContent',
  standalone: true,
})
export class ReadMoreContentDirective {
  @ContentChild(ReadMoreTemplateDirective, { read: TemplateRef })
  template!: TemplateRef<HTMLElement>;
}
