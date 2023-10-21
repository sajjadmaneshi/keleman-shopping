import { Component } from '@angular/core';
import { SymbolDirective } from '../../../../shared/directives/symbol.directive';

@Component({
  selector: 'keleman-empty-content',
  templateUrl: './empty-content.component.html',
  standalone: true,
  imports: [SymbolDirective],
})
export class EmptyContentComponent {}
