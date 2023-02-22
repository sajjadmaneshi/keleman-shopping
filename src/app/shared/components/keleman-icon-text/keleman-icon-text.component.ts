import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'keleman-icon-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keleman-icon-text.component.html',
  styleUrls: ['./keleman-icon-text.component.scss'],
})
export class KelemanIconTextComponent implements OnInit {
  @Input() text: string = '';
  @Input() direction: 'vertical' | 'horizontal' = 'horizontal';
  @Input() size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' = 'h6';
  @Input() iconName!: string;
  @Input() iconClass!: string;
  @Input() textClass!: string;

  innerHtml = '';

  ngOnInit(): void {
    this.innerHtml = `<${this.size} class="mb-0 ${this.textClass ?? ''}">
        ${this.text}</${this.size}>
        <span  class="material-icons ${this.iconClass ?? ''}">${
      this.iconName
    }</span>
`;
  }
}
