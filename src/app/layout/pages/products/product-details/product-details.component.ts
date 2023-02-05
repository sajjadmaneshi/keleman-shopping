import { Component, HostListener } from '@angular/core';
import { ApplicationStateService } from '../../../../shared/services/application-state.service';
import { RelatedArticleModel } from '../../../../shared/models/related-article.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  relatedArticles: RelatedArticleModel[] = [];
  constructor(public applicationState: ApplicationStateService) {
    this._initRelatedArticles();
  }
  @HostListener('mousewheel', ['$event'])
  onScroll() {
    const productDetailsNavbar = document.querySelector(
      '.product-details-navbar'
    )!;

    (productDetailsNavbar as HTMLElement).offsetTop > 700
      ? productDetailsNavbar.classList.add('add-shadow')
      : productDetailsNavbar.classList.remove('add-shadow');
  }

  private _initRelatedArticles() {
    this.relatedArticles = [
      {
        image: 'assets/media/temp/2.jpg',
        title: 'از کار افتادن آسانسور و مهم‌ترین دلایل آن\n',
        description:
          'تابلو فرمان و تابلو برق آسانسور دو قسمت اصلی موتورخانه آسانسور را تشکیل می‌دهند. کنترل آسانسور به وسیله میکروکنترلر موجود تابلو فرمان و تابلو برق آسانسور دو قسمت اصلی موتورخانه آسانسور را تشکیل می‌دهند. کنترل آسانسور به وسیله میکروکنترلر موجود',
      },
      {
        image: 'assets/media/temp/2.jpg',
        title: 'از کار افتادن آسانسور و مهم‌ترین دلایل آن\n',
        description:
          'تابلو فرمان و تابلو برق آسانسور دو قسمت اصلی موتورخانه آسانسور را تشکیل می‌دهند. کنترل آسانسور به وسیله میکروکنترلر موجود ...',
      },
      {
        image: 'assets/media/temp/2.jpg',
        title: 'از کار افتادن آسانسور و مهم‌ترین دلایل آن\n',
        description:
          'تابلو فرمان و تابلو برق آسانسور دو قسمت اصلی موتورخانه آسانسور را تشکیل می‌دهند. کنترل آسانسور به وسیله میکروکنترلر موجود ...',
      },
      {
        image: 'assets/media/temp/2.jpg',
        title: 'از کار افتادن آسانسور و مهم‌ترین دلایل آن\n',
        description:
          'تابلو فرمان و تابلو برق آسانسور دو قسمت اصلی موتورخانه آسانسور را تشکیل می‌دهند. کنترل آسانسور به وسیله میکروکنترلر موجود ...',
      },
      {
        image: 'assets/media/temp/2.jpg',
        title: 'از کار افتادن آسانسور و مهم‌ترین دلایل آن\n',
        description:
          'تابلو فرمان و تابلو برق آسانسور دو قسمت اصلی موتورخانه آسانسور را تشکیل می‌دهند. کنترل آسانسور به وسیله میکروکنترلر موجود ...',
      },
      {
        image: 'assets/media/temp/2.jpg',
        title: 'از کار افتادن آسانسور و مهم‌ترین دلایل آن\n',
        description:
          'تابلو فرمان و تابلو برق آسانسور دو قسمت اصلی موتورخانه آسانسور را تشکیل می‌دهند. کنترل آسانسور به وسیله میکروکنترلر موجود ...',
      },
      {
        image: 'assets/media/temp/2.jpg',
        title: 'از کار افتادن آسانسور و مهم‌ترین دلایل آن\n',
        description:
          'تابلو فرمان و تابلو برق آسانسور دو قسمت اصلی موتورخانه آسانسور را تشکیل می‌دهند. کنترل آسانسور به وسیله میکروکنترلر موجود ...',
      },
    ];
  }
}
