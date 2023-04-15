import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'keleman-text-with-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-with-icon.component.html',
  styleUrls: ['./text-with-icon.component.scss'],
})
export class TextWithIconComponent implements OnInit {
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
