import { Component, Input, OnInit } from '@angular/core';

import { Meta } from '@angular/platform-browser';
import { ArticleViewModel } from '../../data/view-models/article.view-model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  pageUrl: string;
  @Input() article!: ArticleViewModel;
  articles: ArticleViewModel[] = [];

  constructor(private _met: Meta) {
    this.pageUrl = window.location.href;
  }

  ngOnInit() {
    this._met.updateTag({
      name: 'title',
      content: 'آسانسور چیست؟ | بررسی قیمت، قطعات و تاریخچه آسانسور',
    });
  }

  shareOnWhatsApp() {
    let text = encodeURIComponent('Check out this page: ');
    let url = encodeURIComponent(this.pageUrl);
    let whatsappUrl = `whatsapp://send?text=${text}${url}`;
    window.open(whatsappUrl, '_blank');
  }
}
